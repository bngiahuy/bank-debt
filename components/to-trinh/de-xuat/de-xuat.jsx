'use client'
import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

import styles from './index.module.scss'

const DeXuat = (props) => {
  return (
    <div>
      <div className="font-bold text-xl mb-3 mt-4">Đề xuất</div>
      <div className="grid ml-0">
        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Tòa án</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText value={props.suggestion.toa_an} disabled />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Dư nợ đến ngày</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText value={props.suggestion.du_no_den_ngay} disabled />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Vốn gốc</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText value={props.suggestion.von_goc} disabled />
          </div>
        </div>

        <div className="col-12 xl:col-4 md:col-6 pl-0">
          <div className="mb-2">
            <label>Tổng dư nợ</label>
          </div>
          <div className={styles.inputContainer}>
            <InputText value={props.suggestion.tong_du_no} disabled />
          </div>
        </div>
      </div>

      <div className="pl-0">
        <div className="mb-2 mt-2">
          <label>Phương án hòa giải tại tòa</label>
        </div>
        <div className={styles.inputContainer}>
          <InputTextarea
            value={props.suggestion.pa_hoa_giai}
            rows={6}
            style={{ width: '100%' }}
            onChange={(e) =>
              props.setSuggestion({ ...props.suggestion, pa_hoa_giai: e.target.value })
            }
            disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
          />
        </div>
      </div>

      <div className="pl-0">
        <div className="mb-2 mt-2">
          <label>Phương án xét xử và xét xử vắng mặt</label>
        </div>
        <div className={styles.inputContainer}>
          <InputTextarea
            value={props.suggestion.pa_xet_xu}
            rows={6}
            style={{ width: '100%' }}
            onChange={(e) =>
              props.setSuggestion({ ...props.suggestion, pa_xet_xu: e.target.value })
            }
            disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
          />
        </div>
      </div>
    </div>
  )
}

export default DeXuat
