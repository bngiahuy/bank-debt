import React, { useState } from 'react'

import { InputText } from 'primereact/inputtext'

import { Button } from 'primereact/button'

import styles from './index.module.scss'

const EditRelative = (props) => {
  const handleChange = (e, index, fieldName) => {
    const tempArray = [...props.relatives]
    tempArray[index] = {
      ...tempArray[index],
      [fieldName]: e.target.value,
    }
    props.setRelatives('nguoi_than_khach_hang', tempArray)
  }
  if ((typeof props.relatives !== 'array' && !props.relatives) || props.relatives?.length === 0)
    return <div></div>
  return props.relatives.map((relative, index) => {
    return (
      <div key={index}>
        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="relationship"></label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <b>Người thân {index + 1}</b>
          </div>
        </div>

        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="relationship">Quan hệ:</label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <InputText
              id="relationship"
              type="text"
              key={index}
              className={styles.inputText}
              value={props.relatives[index].moi_quan_he}
              onChange={(e) => {
                handleChange(e, index, 'moi_quan_he')
              }}
            />
          </div>
        </div>

        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="relative_name">Tên người thân:</label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <InputText
              id="relative_name"
              type="text"
              className={styles.inputText}
              value={relative.ho_ten}
              onChange={(e) => {
                handleChange(e, index, 'ho_ten')
              }}
            />
          </div>
        </div>

        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="cccd_nguoi_than">Căn cước công dân:</label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <InputText
              id="cccd_nguoi_than"
              type="text"
              className={styles.inputText}
              value={relative.can_cuoc}
              onChange={(e) => {
                handleChange(e, index, 'can_cuoc')
              }}
            />
          </div>
        </div>

        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="relative_phone_number">Số điện thoại người thân:</label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <InputText
              id="relative_phone_number"
              type="text"
              className={styles.inputText}
              value={relative.sdt}
              onChange={(e) => {
                handleChange(e, index, 'sdt')
              }}
            />
          </div>
        </div>

        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="relative_email">Email:</label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <InputText
              id="relative_email"
              type="text"
              className={styles.inputText}
              value={relative.email}
              onChange={(e) => {
                handleChange(e, index, 'email')
              }}
            />
          </div>
        </div>

        <div className="field grid">
          <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
            <label htmlFor="relative_thuong_tru">Địa chỉ thường trú:</label>
          </div>
          <div className="col-12 md:col-9 sm:col-8">
            <InputText
              id="relative_thuong_tru"
              type="text"
              className={styles.inputText}
              value={relative.thuong_tru}
              onChange={(e) => {
                handleChange(e, index, 'thuong_tru')
              }}
            />
          </div>
        </div>

        {index === props.relatives.length - 1 && (
          <div className="field grid">
            <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
              <label htmlFor="relative_thuong_tru"></label>
            </div>
            <div className="col-12 md:col-9 sm:col-8">
              <Button
                icon="pi pi-plus"
                rounded
                outlined
                onClick={() => {
                  props.setRelatives('nguoi_than_khach_hang', [
                    ...props.relatives,
                    props.emptyRelativeForm,
                  ])
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  })
}

export default EditRelative
