'use client'
import React, { useEffect, useState } from 'react'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

import styles from './index.module.scss'

const EditDebtInformation = (props) => {
  const [process, setProcess] = useState({ name: 'Chưa khởi kiện' })

  return (
    <div>
      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="khu_vuc">Khu vực:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="khu_vuc"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.khu_vuc}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, khu_vuc: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="chi_nhanh">Chi nhánh:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="chi_nhanh"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.chi_nhanh}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, chi_nhanh: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="dvcn">Đơn vị chịu nợ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="dvcn"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.don_vi_chiu_no}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, don_vi_chiu_no: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="dvqlhs">Đơn vị quản lý hồ sơ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="dvqlhs"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.don_vi_quan_ly}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, don_vi_quan_ly: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="so_the">Số thẻ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="so_the"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.so_the}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, so_the: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="stk">Số tài khoản:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="stk"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.so_tai_khoan_the}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, so_tai_khoan_the: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="ngay_mo_the">Ngày mở thẻ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="ngay_mo_the"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.ngay_mo_the}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, ngay_mo_the: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="nhomno">Nhóm nợ:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="nhomno"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.nhom_no}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, nhom_no: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="ncn3">Ngày chuyển nhóm 3:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="ncn3"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.ngay_chuyen_nhom_3}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, ngay_chuyen_nhom_3: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="nght">Nợ gốc hiện tại:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="nght"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.no_goc}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, no_goc: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="nlht">Nợ lãi hiện tại:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="nlht"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.no_lai}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, no_lai: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="tdnht">Tổng dư nợ hiện tại:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="tdnht"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.tong_du_no}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, tong_du_no: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="stdtt">Số tiền đã thanh toán:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="stdtt"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.da_thanh_toan}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, da_thanh_toan: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsthad">Lãi suất:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="lsthad"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.lai_suat}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, lai_suat: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsqhad">Hạn mức:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="lsqhad"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.han_muc}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, han_muc: e.target.value })
            }}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsqhad">Tiến độ CN/PGD:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <Dropdown
            value={process}
            onChange={(e) => {
              setProcess(e.value)
              props.setDebtInfoForm({ ...props.debtInfoForm, tien_do_cn_pgd: e.value.name })
            }}
            options={[
              { name: 'Chưa khởi kiện' },
              { name: 'Đã khởi kiện' },
              { name: 'Chưa thi hành án' },
              { name: 'Đã thi hành án' },
            ]}
            optionLabel="name"
            placeholder="Select"
            className={styles.dropdownStyle}
          />
        </div>
      </div>

      <div className="field grid">
        <div className="col-12 mb-2 md:col-3 sm:col-4 sm:mb-0 sm:flex sm:justify-content-end sm:align-items-center">
          <label htmlFor="lsqhad">Nội dung ghi chú tiến độ CN/PGD:</label>
        </div>
        <div className="col-12 md:col-9 sm:col-8">
          <InputText
            id="lsqhad"
            type="text"
            className={styles.inputText}
            value={props.debtInfoForm.tien_do_chi_nhanh}
            onChange={(e) => {
              props.setDebtInfoForm({ ...props.debtInfoForm, tien_do_chi_nhanh: e.target.value })
            }}
          />
        </div>
      </div>

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

export default EditDebtInformation
