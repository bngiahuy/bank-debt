'use client'
import React, { useState } from 'react'

import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'

import styles from './index.module.scss'

const VerdictContent = (props) => {
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
      <div className="font-bold text-xl mb-3 mt-3">Nội dung bản án</div>
      <div className="grid ml-0">
        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>
              Số bản án <span style={{ color: 'red' }}>*</span>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              value={props.form.so_ban_an}
              onChange={(e) => props.setForm({ ...props.form, so_ban_an: e.target.value })}
              disabled={
                ['Đang THA', 'Kết thúc THA'].includes(props.data.trang_thai_tha) ||
                props.role !== 'SHB'
              }
            />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>
              Ngày ra bản án <span style={{ color: 'red' }}>*</span>
            </label>
          </div>
          <div className={styles.inputContainer}>
            {['Đang THA', 'Kết thúc THA'].includes(props.data.trang_thai_tha) ||
            props.role !== 'SHB' ? (
              <InputText value={changeObjToStr(props.form.ngay_ra_ban_an)} disabled />
            ) : (
              <Calendar
                showIcon
                showButtonBar
                value={
                  props.data?.ngay_ra_ban_an ? new Date(props.data?.ngay_ra_ban_an) : calendarValue
                }
                onChange={(e) => {
                  setCalendarValue(e.value ?? null)
                  props.setForm({
                    ...props.form,
                    ngay_ra_ban_an: e.value.toString() ?? '',
                  })
                }}
              />
            )}
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>
              Số tiền bản án <span style={{ color: 'red' }}>*</span>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <InputNumber
              value={props.form.so_tien_ban_an}
              onChange={(e) => props.setForm({ ...props.form, so_tien_ban_an: e.value })}
              mode="decimal"
              disabled={
                ['Đang THA', 'Kết thúc THA'].includes(props.data.trang_thai_tha) ||
                props.role !== 'SHB'
              }
            ></InputNumber>
          </div>
        </div>
      </div>
      <div className={styles.inputAreaContent}>
        <div className="mb-2">
          <label>
            Nội dung bản án <span style={{ color: 'red' }}>*</span>
          </label>
        </div>
        <InputTextarea
          type="text"
          placeholder={props.isCreateNew ? 'Nội dung bản án' : ''}
          rows={12}
          value={props.form.noi_dung_ban_an}
          onChange={(e) => props.setForm({ ...props.form, noi_dung_ban_an: e.target.value })}
          disabled={
            ['Đang THA', 'Kết thúc THA'].includes(props.data.trang_thai_tha) || props.role !== 'SHB'
          }
        />
      </div>
    </div>
  )
}

export default VerdictContent
