'use client'
import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { AutoComplete } from 'primereact/autocomplete'

import { getListStaff } from 'actions/nhan-vien/nhan-vien'

import styles from './index.module.scss'

const AuthorizedStaffInfo = (props) => {
  const [staffs, setStaffs] = useState([])
  const [selectedAutoValue, setSelectedAutoValue] = useState(null)
  const [autoFilteredValue, setAutoFilteredValue] = useState([])

  const search = (event, field) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...staffs])
      } else {
        setAutoFilteredValue(
          staffs.filter((staff) => {
            return staff[field].toString().toLowerCase().startsWith(event.query.toLowerCase())
          })
        )
      }
    }, 250)
  }

  const getStaffList = () => {
    getListStaff('getSHB=true').then((res) => {
      setStaffs(res.results)
    })
  }

  useEffect(() => {
    getStaffList()
  }, [])

  return (
    <div>
      <div className="font-bold text-xl mb-3 mt-3">Thông tin người được ủy quyền</div>
      <div className="grid ml-0">
        <div className="col-12 xl:col-4 lg:col-6 pl-0">
          <div className="mb-2">
            <label>Người được UQ</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText disabled /> */}
            {props.isCreateNew ? (
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue}
                onChange={(e) => {
                  setSelectedAutoValue(e.value)
                  if (typeof e.value === 'object') {
                    props.setForm({
                      ...props.form,
                      id_nguoi_duoc_uq: e.value.user_metadata.ma_nhan_vien,
                    })
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'user_metadata.ho_ten')}
                field="user_metadata.ho_ten"
              />
            ) : (
              <InputText disabled value={props.data.nhan_vien?.ho_ten} />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 lg:col-6 pl-0">
          <div className="mb-2">
            <label>CCCD người được UQ</label>
          </div>
          <div className={styles.inputContainer}>
            {/* <InputText disabled /> */}
            {props.isCreateNew ? (
              <AutoComplete
                placeholder="Search"
                id="dd"
                dropdown
                value={selectedAutoValue}
                onChange={(e) => {
                  setSelectedAutoValue(e.value)
                  if (typeof e.value === 'object') {
                    props.setForm({
                      ...props.form,
                      id_nguoi_duoc_uq: e.value.user_metadata.ma_nhan_vien,
                    })
                  }
                }}
                suggestions={autoFilteredValue}
                completeMethod={(e) => search(e, 'can_cuoc')}
                field="user_metadata.can_cuoc"
              />
            ) : (
              <InputText disabled value={props.data.nhan_vien?.can_cuoc} />
            )}
          </div>
        </div>

        {/* <div className="col-12 xl:col-4 lg:col-6 pl-0">
          <div className="mb-2">
            <label>Ngày cấp CCCD người được UQ</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText disabled />
          </div>
        </div>

        <div className="col-12 xl:col-4 lg:col-6 pl-0">
          <div className="mb-2">
            <label>Nơi cấp CCCD người được UQ</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText disabled />
          </div>
        </div> */}

        <div className="col-12 xl:col-4 lg:col-6 pl-0">
          <div className="mb-2">
            <label>Chức danh người được UQ</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <InputText
                disabled
                value={selectedAutoValue ? selectedAutoValue.user_metadata.chuc_danh : ''}
              />
            ) : (
              <InputText disabled value={props.data.nhan_vien?.chuc_danh} />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 lg:col-6 pl-0">
          <div className="mb-2">
            <label>Số điện thoại người được UQ</label>
          </div>
          <div className={styles.inputContainer}>
            {props.isCreateNew ? (
              <InputText disabled value={selectedAutoValue ? selectedAutoValue.phone : ''} />
            ) : (
              <InputText disabled value={props.data.nhan_vien?.phone} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorizedStaffInfo
