'use client'
import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

import styles from './index.module.scss'

const TinhHinhXLNQuaHan = (props) => {
  return (
    <div>
      <div className="font-bold text-xl mb-3 mt-2">Tình hình xử lý nợ quá hạn</div>

      <div className="pl-0">
        <div className="mb-2 mt-2">
          <label>Khoản mục (Điện thoại)</label>
        </div>
        <div className={styles.inputContainer}>
          <InputTextarea
            value={props.xlnSituation.dien_thoai}
            rows={6}
            style={{ width: '100%' }}
            onChange={(e) =>
              props.setXlnSituation({ ...props.xlnSituation, dien_thoai: e.target.value })
            }
            disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
          />
        </div>
      </div>

      <div className="pl-0">
        <div className="mb-2 mt-2">
          <label>Khoản mục (Gửi thư, công văn)</label>
        </div>
        <div className={styles.inputContainer}>
          <InputTextarea
            value={props.xlnSituation.gui_thu_cong_van}
            rows={6}
            style={{ width: '100%' }}
            onChange={(e) =>
              props.setXlnSituation({ ...props.xlnSituation, gui_thu_cong_van: e.target.value })
            }
            disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
          />
        </div>
      </div>

      <div className="pl-0">
        <div className="mb-2 mt-2">
          <label>Khoản mục (Đến nhà khách hàng)</label>
        </div>
        <div className={styles.inputContainer}>
          <InputTextarea
            value={props.xlnSituation.den_nha_khach_hang}
            rows={6}
            style={{ width: '100%' }}
            onChange={(e) =>
              props.setXlnSituation({ ...props.xlnSituation, den_nha_khach_hang: e.target.value })
            }
            disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
          />
        </div>
      </div>

      <div className="pl-0">
        <div className="mb-2 mt-2">
          <label>Khoản mục (Đến công ty)</label>
        </div>
        <div className={styles.inputContainer}>
          <InputTextarea
            value={props.xlnSituation.den_cong_ty}
            rows={6}
            style={{ width: '100%' }}
            onChange={(e) =>
              props.setXlnSituation({ ...props.xlnSituation, den_cong_ty: e.target.value })
            }
            disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
          />
        </div>
      </div>

      <div className="pl-0">
        <div className="mb-2 mt-2">
          <label>Khoản mục (Tác động khác)</label>
        </div>
        <div className={styles.inputContainer}>
          <InputTextarea
            value={props.xlnSituation.tac_dong_khac}
            rows={6}
            style={{ width: '100%' }}
            onChange={(e) =>
              props.setXlnSituation({ ...props.xlnSituation, tac_dong_khac: e.target.value })
            }
            disabled={props.role !== 'SHB' || (!props.isCreateNew && props.approvedOrRefused)}
          />
        </div>
      </div>
    </div>
  )
}

export default TinhHinhXLNQuaHan
