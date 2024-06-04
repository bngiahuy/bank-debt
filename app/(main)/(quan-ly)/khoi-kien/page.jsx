'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import LawsuitSearch from '@/components/lawsuitAndExecution/search/lawsuit-search'
import ManageLawsuitTable from '@/components/lawsuitAndExecution/manageLawsuitTable/ManageLawsuitTable'

import { getListCustomer } from 'actions/customer/Customer'
import { getListLawsuit, getListLawsuitFilter } from 'actions/tien-do-khoi-kien/tien-do-khoi-kien'
import { getListStaff } from 'actions/nhan-vien/nhan-vien'

const ManageLawsuit = (props) => {
  const [checkedList, setCheckedList] = useState([])
  const [customers, setCustomers] = useState([])
  const [staffs, setStaffs] = useState([])
  const [lawsuits, setLawsuits] = useState([])
  const [filterBody, setFilterBody] = useState({})
  const toast = useRef(null)

  const getListCustomers = () => {
    getListCustomer('queryAll=true').then((res) => {
      if (res && res.count) {
        setCustomers(res.results)
      }
    })
  }

  const getStaffList = () => {
    getListStaff('').then((res) => {
      if (res.results) {
        setStaffs(res.results)
      }
    })
  }

  const getListLawsuits = (query) => {
    getListLawsuit(query ? query : '').then((res) => {
      if (res && res.count) {
        setLawsuits(res.results)
      }
    })
  }

  const getListLawsuitsWithFilter = (filter) => {
    getListLawsuitFilter({ filter: { ...filter, ma_nv_uy_quyen: props.user.ma_nhan_vien } }).then(
      (res) => {
        if (res && res.count >= 0) {
          setLawsuits(res.result)
        }
      }
    )
  }

  const informAddSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Tạo mới khởi kiện thành công',
      life: 3000,
    })
    localStorage.removeItem('addLawsuit')
  }

  useEffect(() => {
    if (localStorage.getItem('addLawsuit') === 'success') {
      informAddSuccessfully()
    }
    getStaffList()
    getListCustomers()
    getListLawsuits(props.user.role === 'SHB' ? `ma_nhan_vien=${props.user.ma_nhan_vien}` : '')
  }, [])

  return (
    <div className="card">
      <Toast ref={toast} />
      <div>
        <Accordion>
          <AccordionTab header="Tìm kiếm">
            <LawsuitSearch
              customers={customers}
              staffs={staffs}
              setFilterBody={setFilterBody}
              getListLawsuits={getListLawsuits}
              getListLawsuitsWithFilter={getListLawsuitsWithFilter}
              isJudgmentExecution
            />
          </AccordionTab>
        </Accordion>
      </div>
      <div>
        <div className="flex justify-content-between align-items-center mb-3">
          <div className="font-bold text-xl mt-3 mb-2">Danh sách khởi kiện</div>
          <div className="flex" style={{ gap: '16px' }}>
            {checkedList.length > 0 && (
              <Button
                label="Xóa"
                style={{
                  height: '36px',
                  width: '80px',
                  backgroundColor: 'white',
                  color: 'red',
                  border: '1px solid red',
                }}
                className="mt-3"
              />
            )}
            {props.user.role === 'SHB' && (
              <Link href={{ pathname: 'khoi-kien/ho-so', query: { createNew: true } }}>
                <Button label="Thêm" style={{ height: '36px', width: '100px' }} className="mt-3" />
              </Link>
            )}
          </div>
        </div>
        <ManageLawsuitTable
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          lawsuits={lawsuits}
          isFiltering={Object.keys(filterBody).length > 0}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ManageLawsuit)
