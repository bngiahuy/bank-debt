'use client'
import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'

import styles from './index.module.scss'

const LawsuitFileTUAP = (props) => {
  const [showDialog, setShowDialog] = useState(false)
  const [newTUAPForm, setNewTUAPForm] = useState({})
  const [calendarValue, setCalendarValue] = useState(null)
  const [calendarValue2, setCalendarValue2] = useState(null)
  const [calendarValue3, setCalendarValue3] = useState(null)
  const [apState, setApState] = useState({})
  const [errors, setErrors] = useState({})

  const onCancel = () => {
    setNewTUAPForm({})
    setCalendarValue(null)
    setCalendarValue2(null)
    setApState({})
    setErrors({})
    setShowDialog(false)
  }

  const preCheck = () => {
    let noError = true
    const tempErrors = {}
    if (!newTUAPForm.so_tien_tuap) {
      tempErrors.soTienTuapError = true
      noError = false
    }
    if (!calendarValue) {
      tempErrors.calendarValueError = true
      noError = false
    }
    if (!apState.name) {
      tempErrors.apStateError = true
      noError = false
    }
    setErrors(tempErrors)
    return noError
  }

  const handleCreate = () => {
    const dateTime = new Date(calendarValue)
    const dateTime2 = calendarValue2 ? new Date(calendarValue2) : null
    const dateTime3 = calendarValue3 ? new Date(calendarValue3) : null
    const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()

    const month =
      dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1

    const year = dateTime.getFullYear()
    const date2 = dateTime2
      ? dateTime2.getDate() < 10
        ? `0${dateTime2.getDate()}`
        : dateTime2.getDate()
      : ''
    const month2 = dateTime2
      ? dateTime2.getMonth() + 1 < 10
        ? `0${dateTime2.getMonth() + 1}`
        : dateTime2.getMonth() + 1
      : ''
    const year2 = dateTime2 ? dateTime2.getFullYear() : ''
    const date3 = dateTime3
      ? dateTime3.getDate() < 10
        ? `0${dateTime3.getDate()}`
        : dateTime3.getDate()
      : ''
    const month3 = dateTime3
      ? dateTime3.getMonth() + 1 < 10
        ? `0${dateTime3.getMonth() + 1}`
        : dateTime3.getMonth() + 1
      : ''
    const year3 = dateTime3 ? dateTime3.getFullYear() : ''

    props.setTuapForm([
      {
        so_tien_tuap: newTUAPForm.so_tien_tuap,
        so_tien_dong_tuap: newTUAPForm.so_tien_dong_tuap,
        so_bien_lai: newTUAPForm.so_bien_lai,
        so_tien_hoan_tuap: newTUAPForm.so_tien_hoan_tuap,
        ngay_tb_tuap: `${year}-${month}-${date}`,
        ngay_dong_tuap: year2 ? `${year2}-${month2}-${date2}` : null,
        ngay_hoan_tuap: year3 ? `${year3}-${month3}-${date3}` : null,
        trang_thai_tuap: apState.name,
        // nguoi_thuc_hien: props.user.ho_ten,
        ma_khoi_kien: props.id,
        updated_at: 'Được thêm sau khi lưu',
        ma_khach_hang: props.data.ma_khach_hang,
        ma_nhan_vien: props.user.ma_nhan_vien,
      },
      ...props.tuapForm,
    ])

    onCancel()
  }

  const renderAddAppointmentContent = () => {
    return (
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="ngay_hen">
            Số tiền TUAP <span style={{ color: 'red' }}>*</span>
          </label>
          <InputNumber
            value={newTUAPForm.so_tien_tuap}
            onChange={(e) => {
              setNewTUAPForm({ ...newTUAPForm, so_tien_tuap: e.value })
              setErrors({ ...errors, soTienTuapError: false })
            }}
            mode="decimal"
            className={errors.soTienTuapError ? 'p-invalid' : ''}
          ></InputNumber>
        </div>

        <div className="field">
          <label>
            Ngày thông báo TUAP <span style={{ color: 'red' }}>*</span>
          </label>
          <Calendar
            showIcon
            showButtonBar
            placeholder="Chọn ngày thông báo TUAP"
            value={calendarValue}
            onChange={(e) => {
              setCalendarValue(e.value ?? null)
              setErrors({ ...errors, calendarValueError: false })
            }}
            className={errors.calendarValueError ? styles.calenderError : ''}
          />
        </div>

        <div className="field">
          <label htmlFor="noi_dung_hen">
            Trạng thái AP <span style={{ color: 'red' }}>*</span>
          </label>
          <Dropdown
            value={apState}
            onChange={(e) => {
              setApState(e.value)
              setErrors({ ...errors, apStateError: false })
            }}
            options={[{ name: 'Đã đóng TUAP' }, { name: 'Chưa đóng TUAP' }]}
            optionLabel="name"
            placeholder="Chọn trạng thái AP"
            className={errors.apStateError ? 'p-invalid' : ''}
          />
        </div>

        <div className="field">
          <label htmlFor="ngay_hen">Số tiền đóng TUAP</label>
          <InputNumber
            value={newTUAPForm.so_tien_dong_tuap}
            onChange={(e) => setNewTUAPForm({ ...newTUAPForm, so_tien_dong_tuap: e.value })}
            mode="decimal"
          ></InputNumber>
        </div>

        <div className="field">
          <label>Ngày đóng TUAP</label>
          <Calendar
            showIcon
            showButtonBar
            placeholder="Chọn ngày đóng TUAP"
            value={calendarValue2}
            onChange={(e) => setCalendarValue2(e.value ?? null)}
          />
        </div>

        <div className="field">
          <label htmlFor="so_bien_lai">Số biên lai</label>
          <InputText
            id="so_bien_lai"
            placeholder="Nhập số biên lai"
            value={newTUAPForm.so_bien_lai}
            onChange={(e) => setNewTUAPForm({ ...newTUAPForm, so_bien_lai: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="so_tien_hoan">Số tiền hoàn</label>
          <InputNumber
            value={newTUAPForm.so_tien_hoan_tuap}
            onChange={(e) => setNewTUAPForm({ ...newTUAPForm, so_tien_hoan_tuap: e.value })}
            mode="decimal"
          ></InputNumber>
        </div>

        <div className="field">
          <label>Ngày hoàn TUAP</label>
          <Calendar
            showIcon
            showButtonBar
            placeholder="Chọn ngày hoàn TUAP"
            value={calendarValue3}
            onChange={(e) => setCalendarValue3(e.value ?? null)}
          />
        </div>

        <div>
          <div className="flex justify-content-center mt-2">
            <Button
              label="Hủy"
              severity="primary"
              outlined
              style={{ width: '80px', height: '36px' }}
              onClick={() => onCancel()}
            />
            <Button
              label="Tạo"
              style={{ width: '80px', height: '36px', marginLeft: '16px' }}
              onClick={() => {
                if (preCheck()) {
                  handleCreate()
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  const getData = () => {
    if (props.data?.tuap && props.data?.tuap.length > 0) {
      return [...props.tuapForm, ...props.data?.tuap]
    } else {
      return [...props.tuapForm]
    }
  }

  const renderSTT = (rowData) => {
    if (rowData.updated_at === 'Được thêm sau khi lưu') {
      return <div>{`${rowData.STT} (mới)`}</div>
    }
    return <div>{rowData.STT}</div>
  }

  const renderNotifyDate = (rowData) => {
    const year = rowData.ngay_tb_tuap.substr(0, 4)
    const month = rowData.ngay_tb_tuap.substr(5, 2)
    const date = rowData.ngay_tb_tuap.substr(8, 2)
    return (
      <div>
        {date}/{month}/{year}
      </div>
    )
  }

  const renderSoTienTUAP = (rowData) => {
    return <div>{rowData.so_tien_tuap}</div>
  }

  const renderSoTienDongTUAP = (rowData) => {
    return <div>{rowData.so_tien_dong_tuap}</div>
  }

  const renderSoTienHoan = (rowData) => {
    return <div>{rowData.so_tien_hoan_tuap}</div>
  }

  const renderNgayDongTUAP = (rowData) => {
    if (!rowData.ngay_dong_tuap) {
      return <div></div>
    }
    const year = rowData.ngay_dong_tuap.substr(0, 4)
    const month = rowData.ngay_dong_tuap.substr(5, 2)
    const date = rowData.ngay_dong_tuap.substr(8, 2)
    return (
      <div>
        {date}/{month}/{year}
      </div>
    )
  }

  const renderNgayHoanTUAP = (rowData) => {
    if (!rowData.ngay_hoan_tuap) {
      return <div></div>
    }
    const year = rowData.ngay_hoan_tuap.substr(0, 4)
    const month = rowData.ngay_hoan_tuap.substr(5, 2)
    const date = rowData.ngay_hoan_tuap.substr(8, 2)
    return (
      <div>
        {date}/{month}/{year}
      </div>
    )
  }

  const renderTUAPCreator = (rowData) => {
    if (rowData.updated_at === 'Được thêm sau khi lưu') {
      return (
        <div>
          {props.user.ho_ten} ({props.user.ma_nhan_vien})
        </div>
      )
    }
    return (
      <div>
        {rowData.nhan_vien?.ho_ten} ({rowData.nhan_vien?.ma_nhan_vien})
      </div>
    )
  }

  const renderUpdateTime = (rowData) => {
    if (rowData.updated_at === 'Được thêm sau khi lưu') {
      return <div>Được thêm sau khi lưu</div>
    }
    const dateTime = new Date(rowData.created_at)
    const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
    const month =
      dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1
    const year = dateTime.getFullYear()
    return (
      <div>
        {date}/{month}/{year}
      </div>
    )
  }

  return (
    <div className="mt-3">
      <Dialog
        header="Tạo TUAP"
        visible={showDialog}
        style={{ maxWidth: '400px', width: '90%' }}
        modal
        onHide={() => onCancel()}
      >
        {renderAddAppointmentContent()}
      </Dialog>
      <div className="flex mb-3 justify-content-between align-items-end">
        <div className="font-bold text-xl ">Tạm ứng án phí</div>
        <div className="flex">
          {props.user.role === 'SHB' && (
            <Button label="Tạo TUAP" onClick={() => setShowDialog(true)} />
          )}
          <Button label="Xuất Excel" className="ml-4" severity="success" />
        </div>
      </div>
      <div>
        <DataTable
          value={getData().map((item, index) => {
            return {
              STT: index + 1,
              ...item,
            }
          })}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay='menu'
          responsiveLayout="scroll"
          emptyMessage="Không có dữ liệu"
          // header={header1}
        >
          <Column header="STT" style={{ minWidth: '6rem' }} body={renderSTT} />
          <Column field="trang_thai_tuap" header="Trạng thái AP" style={{ minWidth: '10rem' }} />
          <Column
            header="Ngày thông báo TUAP"
            style={{ minWidth: '8rem' }}
            body={renderNotifyDate}
          />
          <Column header="Số tiền TUAP" style={{ minWidth: '10rem' }} body={renderSoTienTUAP} />
          <Column
            header="Số tiền đóng TUAP"
            style={{ minWidth: '12rem' }}
            body={renderSoTienDongTUAP}
          />
          <Column header="Ngày đóng TUAP" style={{ minWidth: '8rem' }} body={renderNgayDongTUAP} />
          <Column field="so_bien_lai" header="Số biên lai" style={{ minWidth: '8rem' }} />
          <Column header="Số tiền hoàn" style={{ minWidth: '10rem' }} body={renderSoTienHoan} />
          <Column header="Ngày hoàn TUAP" style={{ minWidth: '8rem' }} body={renderNgayHoanTUAP} />
          <Column header="Người thực hiện" style={{ minWidth: '12rem' }} body={renderTUAPCreator} />
          <Column header="Ngày tạo TUAP" style={{ minWidth: '13rem' }} body={renderUpdateTime} />
        </DataTable>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(LawsuitFileTUAP)
