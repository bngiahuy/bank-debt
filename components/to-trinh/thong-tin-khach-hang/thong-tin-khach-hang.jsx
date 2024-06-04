'use client'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { InputText } from 'primereact/inputtext'
import { AutoComplete } from 'primereact/autocomplete'
import { Dropdown } from 'primereact/dropdown'

import { getListCustomer } from 'actions/customer/Customer'

import styles from './index.module.scss'

const ThongTinKhachHang = (props) => {
  const [customers, setCustomers] = useState([])
  const [selectedAutoValue1, setSelectedAutoValue1] = useState(null)
  const [selectedAutoValue2, setSelectedAutoValue2] = useState(null)
  const [selectedAutoValue3, setSelectedAutoValue3] = useState(null)
  const [autoFilteredValue, setAutoFilteredValue] = useState([])

  const search = (event, field) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...customers])
      } else {
        setAutoFilteredValue(
          customers.filter((customer) => {
            return customer[field].toString().toLowerCase().startsWith(event.query.toLowerCase())
          })
        )
      }
    }, 250)
  }

  const getListCustomers = () => {
    getListCustomer(`queryAll=true&ma_nhan_vien=${props.user.ma_nhan_vien}`).then((res) => {
      if (res && res.count) {
        setCustomers(res.results)
      }
    })
  }

  useEffect(() => {
    if (props.isCreateNew) {
      getListCustomers()
    }
  }, [])

  return (
    <div>
      <div className="font-bold text-xl mb-3">Thông tin khách hàng</div>
      <div className="grid ml-0">
        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Mã khách hàng</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue1}
                onChange={(e) => {
                  setSelectedAutoValue1(e.value)
                  if (typeof e.value === 'object') {
                    props.setSelectedCustomer(e.value)
                    setSelectedAutoValue2(e.value)
                    setSelectedAutoValue3(e.value)
                  } else {
                    setSelectedAutoValue2(null)
                    setSelectedAutoValue3(null)
                    props.setSelectedCustomer({})
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'ma_khach_hang')}
                field="ma_khach_hang"
              />
            ) : (
              <InputText value={props.detail?.khach_hang?.ma_khach_hang} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Căn cước công dân</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue2}
                onChange={(e) => {
                  setSelectedAutoValue2(e.value)
                  if (typeof e.value === 'object') {
                    props.setSelectedCustomer(e.value)
                    setSelectedAutoValue1(e.value)
                    setSelectedAutoValue3(e.value)
                  } else {
                    setSelectedAutoValue1(null)
                    setSelectedAutoValue3(null)
                    props.setSelectedCustomer({})
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'can_cuoc')}
                field="can_cuoc"
              />
            ) : (
              <InputText value={props.detail?.khach_hang?.can_cuoc} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Họ và tên</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue3}
                onChange={(e) => {
                  setSelectedAutoValue3(e.value)
                  if (typeof e.value === 'object') {
                    props.setSelectedCustomer(e.value)
                    setSelectedAutoValue1(e.value)
                    setSelectedAutoValue2(e.value)
                  } else {
                    setSelectedAutoValue1(null)
                    setSelectedAutoValue2(null)
                    props.setSelectedCustomer({})
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'ho_ten')}
                field="ho_ten"
              />
            ) : (
              <InputText value={props.detail?.khach_hang?.ho_ten} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Địa chỉ thường trú</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <InputText
                value={
                  selectedAutoValue1 && typeof selectedAutoValue1 == 'object'
                    ? selectedAutoValue1.thuong_tru
                    : ''
                }
                disabled
              />
            ) : (
              <InputText value={props.detail?.khach_hang?.thuong_tru} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Địa chỉ tạm trú</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <InputText
                value={
                  selectedAutoValue1 && typeof selectedAutoValue1 == 'object'
                    ? selectedAutoValue1.tam_tru
                    : ''
                }
                disabled
              />
            ) : (
              <InputText value={props.detail?.khach_hang?.tam_tru} disabled />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ThongTinKhachHang)
