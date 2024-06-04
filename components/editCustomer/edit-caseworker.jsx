import React, { useState } from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { AutoComplete } from 'primereact/autocomplete'

import styles from './index.module.scss'

const EditCaseworker = (props) => {
  const [selectedAutoValue, setSelectedAutoValue] = useState(null)
  const [autoFilteredValue, setAutoFilteredValue] = useState([])

  const search = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        setAutoFilteredValue([...props.staffs])
      } else {
        setAutoFilteredValue(
          props.staffs.filter((staff) => {
            return staff.user_metadata.ho_ten.toLowerCase().startsWith(event.query.toLowerCase())
          })
        )
      }
    }, 250)
  }

  return (
    <div>
      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="caseworker1">Nhân viên phụ trách 1:</label>
        </div>
        <div className={`col-12 md:col-9 sm:col-8 ${styles.autoCompleteContainer}`}>
          <AutoComplete
            placeholder="Search"
            id="dd"
            dropdown
            value={selectedAutoValue}
            onChange={(e) => {
              setSelectedAutoValue(e.value)
              props.setCustomerForm({
                ...props.customerForm,
                nhan_vien_phu_trach_1: e.value.user_metadata.ma_nhan_vien,
              })
            }}
            suggestions={autoFilteredValue}
            completeMethod={search}
            field="user_metadata.ho_ten"
            className={styles.inputText}
          />
        </div>
      </div>

      {!props.isAdding && (
        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="caseworker2">Nhân viên phụ trách 2:</label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <InputText id="caseworker2" type="text" className={styles.inputText} disabled />
          </div>
        </div>
      )}

      <div className="flex justify-content-end">
        <Button
          label="Hủy"
          outlined
          style={{ width: '90px', marginRight: '16px', height: '36px' }}
          onClick={() => window.history.back()}
        />
        {props.isAdding ? (
          <Button
            label="Thêm"
            style={{ width: '90px', height: '36px' }}
            onClick={() => props.handleAddCustomer()}
          />
        ) : (
          <Button label="Lưu" style={{ width: '90px', height: '36px' }} />
        )}
      </div>
    </div>
  )
}

export default EditCaseworker
