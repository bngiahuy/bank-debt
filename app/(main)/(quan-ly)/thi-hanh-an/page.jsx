'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

import LawsuitSearch from '@/components/lawsuitAndExecution/search/lawsuit-search'
import ManageJudgmentExecutionTable from '@/components/lawsuitAndExecution/manageJudgmentExecutionTable/ManageJudgmentExecutionTable'

import { getJudgments } from 'actions/tien-do-thi-hanh-an/tien-do-thi-hanh-an'
import { getListCustomer } from 'actions/customer/Customer'
import { getListStaff } from 'actions/nhan-vien/nhan-vien'

const ManageJudgmentExecution = (props) => {
  const [checkedList, setCheckedList] = useState([])
  const [data, setData] = useState([])
  const [customers, setCustomers] = useState([])
  const [staffs, setStaffs] = useState([])
  const toast = useRef(null)

  const getListJudgments = (query) => {
    getJudgments(query ? query : '').then((res) => {
      if (res && !res.error) {
        setData(res.results)
      }
    })
  }

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

  const informAddSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Tạo mới thi hành án thành công',
      life: 3000,
    })
    localStorage.removeItem('addJudgment')
  }

  useEffect(() => {
    if (localStorage.getItem('addJudgment') === 'success') {
      informAddSuccessfully()
    }
    getStaffList()
    getListCustomers()
    getListJudgments(props.user.role === 'SHB' ? `ma_nhan_vien=${props.user.ma_nhan_vien}` : '')
  }, [])

  return (
    <div className="card">
      <Toast ref={toast} />
      <div>
        <Accordion>
          <AccordionTab header="Tìm kiếm">
            <LawsuitSearch customers={customers} staffs={staffs} isJudgmentExecution />
          </AccordionTab>
        </Accordion>
      </div>
      <div>
        <div className="flex justify-content-between align-items-center mb-3">
          <div className="font-bold text-xl mt-4 mb-2">Danh sách thi hành án</div>
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
              <Link href={{ pathname: 'thi-hanh-an/ho-so', query: { createNew: true } }}>
                <Button label="Thêm" style={{ height: '36px', width: '100px' }} className="mt-3" />
              </Link>
            )}
          </div>
        </div>

        <ManageJudgmentExecutionTable
          data={data}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
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

export default connect(mapStateToProps)(ManageJudgmentExecution)
