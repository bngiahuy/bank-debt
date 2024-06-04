'use client'
import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'

import styles from './index.module.scss'

const ThongTinGiamLai = (props) => {
  return (
    <div>
      <div className="font-bold text-xl mb-3 mt-4">Thông tin miễn giảm</div>
      <div className="grid ml-0">
        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Số tiền cần thanh toán</label>
          </div>
          <div className={styles.inputContainer}>
            <InputNumber
              value={props.amountToBePaid}
              onChange={(e) => {
                props.setAmountToBePaid(e.value)
                props.setCanPressSave(true)
              }}
              mode="decimal"
              disabled={
                props.role !== 'SHB' ||
                (!props.isCreateNew && props.detail.trang_thai !== 'Chưa duyệt')
              }
            ></InputNumber>
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Hạn thanh toán</label>
          </div>
          <div className={styles.inputContainer}>
            <Calendar
              showIcon
              showButtonBar
              value={props.calendarValue}
              onChange={(e) => {
                props.setCalendarValue(e.value ?? null)
                props.setCanPressSave(true)
              }}
              disabled={
                props.role !== 'SHB' ||
                (!props.isCreateNew && props.detail.trang_thai !== 'Chưa duyệt')
              }
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Số tiền lãi giảm</label>
          </div>
          <div className={styles.inputContainer}>
            <InputNumber
              value={props.amountToBeDecreased}
              onChange={(e) => {
                props.setAmountToBeDecreased(e.value)
                props.setCanPressSave(true)
              }}
              mode="decimal"
              disabled={
                props.role !== 'SHB' ||
                (!props.isCreateNew && props.detail.trang_thai !== 'Chưa duyệt')
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThongTinGiamLai
