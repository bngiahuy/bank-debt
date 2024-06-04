'use client'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { InputText } from 'primereact/inputtext'
import { AutoComplete } from 'primereact/autocomplete'
import { Dropdown } from 'primereact/dropdown'

import { getListCustomer } from 'actions/customer/Customer'

import { provinces, districts } from 'utils/provinces-districts/provinces-districts'

import styles from './index.module.scss'

const LawsuitFileCustomerInfo = (props) => {
  const [customers, setCustomers] = useState([])
  const [selectedAutoValue1, setSelectedAutoValue1] = useState(null)
  const [selectedAutoValue2, setSelectedAutoValue2] = useState(null)
  const [selectedAutoValue3, setSelectedAutoValue3] = useState(null)
  const [autoFilteredValue, setAutoFilteredValue] = useState([])
  const [province, setProvince] = useState({})
  const [district, setDistrict] = useState({})

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
    getListCustomer(`ma_nhan_vien=${props.user.ma_nhan_vien}`).then((res) => {
      setCustomers(res.results)
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
                    props.setForm({ ...props.form, ma_khach_hang: e.value.ma_khach_hang })
                    setSelectedAutoValue2(e.value)
                    setSelectedAutoValue3(e.value)
                  } else {
                    setSelectedAutoValue2(null)
                    setSelectedAutoValue3(null)
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'ma_khach_hang')}
                field="ma_khach_hang"
              />
            ) : (
              <InputText value={props.data.ma_khach_hang} disabled />
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
                    props.setForm({ ...props.form, ma_khach_hang: e.value.ma_khach_hang })
                    setSelectedAutoValue1(e.value)
                    setSelectedAutoValue3(e.value)
                  } else {
                    setSelectedAutoValue1(null)
                    setSelectedAutoValue3(null)
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'can_cuoc')}
                field="can_cuoc"
              />
            ) : (
              <InputText value={props.data.khach_hang?.can_cuoc} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Họ và tên</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              // <InputText value={selectedAutoValue ? selectedAutoValue.ho_ten : ''} disabled />
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue3}
                onChange={(e) => {
                  setSelectedAutoValue3(e.value)
                  if (typeof e.value === 'object') {
                    props.setForm({ ...props.form, ma_khach_hang: e.value.ma_khach_hang })
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
              <InputText value={props.data.khach_hang?.ho_ten} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Địa chỉ thường trú</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <InputText value={selectedAutoValue1 ? selectedAutoValue1.thuong_tru : ''} disabled />
            ) : (
              <InputText value={props.data.khach_hang?.thuong_tru} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Địa chỉ tạm trú</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <InputText value={selectedAutoValue1 ? selectedAutoValue1.tam_tru : ''} disabled />
            ) : (
              <InputText value={props.data.khach_hang?.tam_tru} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Tỉnh/Thành phố</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText /> */}
            {props.isCreateNew ? (
              <Dropdown
                value={province}
                onChange={(e) => {
                  setProvince(e.value)
                  props.setForm({ ...props.form, tinh_tp: e.value.name })
                }}
                options={provinces}
                optionLabel="name"
                placeholder="Select"
              />
            ) : (
              <InputText value={props.data.tinh_tp} disabled />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Quận/Huyện</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText /> */}
            {props.isCreateNew ? (
              <Dropdown
                value={district}
                onChange={(e) => {
                  setDistrict(e.value)
                  props.setForm({ ...props.form, quan_huyen: e.value.name })
                }}
                options={districts[province.name]}
                optionLabel="name"
                placeholder="Select"
              />
            ) : (
              <InputText value={props.data.quan_huyen} disabled />
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

export default connect(mapStateToProps)(LawsuitFileCustomerInfo)
