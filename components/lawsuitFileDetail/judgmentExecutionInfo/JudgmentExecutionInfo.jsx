'use client'
import React, { useState } from 'react'

import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'

import styles from './index.module.scss'

const JudgmentExecutionInfo = (props) => {
  const [calendarValue, setCalendarValue] = useState(null)

  const changeObjToStr = (data) => {
    if (!data) return data
    else {
      const dateTime = new Date(data)
      const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
      const month =
        dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1
      const year = dateTime.getFullYear()
      return `${month}-${date}-${year}`
    }
  }

  return (
    <div>
      <div className="font-bold text-xl mb-3 mt-3">Thông tin Thi hành án</div>
      <div className="grid ml-0">
        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>
              Chấp hành viên <span style={{ color: 'red' }}>*</span>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              value={props.form.chap_hanh_vien}
              onChange={(e) => props.setForm({ ...props.form, chap_hanh_vien: e.target.value })}
              disabled={props.role !== 'SHB'}
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>
              Số Quyết định <span style={{ color: 'red' }}>*</span>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              value={props.form.so_quyet_dinh}
              onChange={(e) => props.setForm({ ...props.form, so_quyet_dinh: e.target.value })}
              disabled={props.role !== 'SHB'}
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>
              Ngày ra Quyết định <span style={{ color: 'red' }}>*</span>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <Calendar
              showIcon
              showButtonBar
              value={
                calendarValue ? calendarValue : null || new Date(props.data?.ngay_ra_quyet_dinh)
              }
              onChange={(e) => {
                setCalendarValue(e.value ?? null)
                props.setForm({
                  ...props.form,
                  ngay_ra_quyet_dinh: e.value.toString() ?? '',
                })
              }}
              disabled={props.role !== 'SHB'}
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>
              Số tiền Quyết định <span style={{ color: 'red' }}>*</span>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <InputNumber
              value={props.form.so_tien_quyet_dinh}
              onChange={(e) => props.setForm({ ...props.form, so_tien_quyet_dinh: e.value })}
              mode="decimal"
              disabled={props.role !== 'SHB'}
            ></InputNumber>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JudgmentExecutionInfo
