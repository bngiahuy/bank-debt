'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { connect } from 'react-redux'

import LawsuitFileCustomerInfo from '@/components/lawsuitFileDetail/lawsuitFileCustomerInfo/LawsuitFileCustomerInfo'
import AuthorizedStaffInfo from '@/components/lawsuitFileDetail/authorizedStaffInfo/AuthorizedStaffInfo'
import JudgmentActions from '@/components/judgment-detail/judgment-actions/judgment-actions'
import LogInfo from '@/components/lawsuitFileDetail/logInfo/LogInfo'
import JudgmentAppointments from '@/components/judgment-detail/judgment-appointments/judgment-appointments'
import LawsuitFileNotification from '@/components/lawsuitFileDetail/lawsuitFileNotification/LawsuitFileNotification'
import JudgmentExecutionInfo from '@/components/lawsuitFileDetail/judgmentExecutionInfo/JudgmentExecutionInfo'
import UpdateDecision from '@/components/lawsuitFileDetail/updateDecision/UpdateDecision'
import VerdictContent from '@/components/judgment-detail/verdict-content/verdict-content'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css'

import {
  addJudgment,
  getDetailJudgment,
  updateJudgment,
} from 'actions/tien-do-thi-hanh-an/tien-do-thi-hanh-an'

import { addAppointment } from 'actions/lich-hen/lich-hen'

const JudgmentExecutionFile = (props) => {
  const toast = useRef(null)
  const [checkedList, setCheckedList] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [form, setForm] = useState({})
  const [data, setData] = useState({})
  const [state, setState] = useState('')
  const [appointments, setAppointments] = useState([])
  const [displayConfirmation, setDisplayConfirmation] = useState(false)
  const searchParams = useSearchParams()
  const isCreateNew = searchParams.get('createNew')
  const id = searchParams.get('ma_thi_hanh_an') ? searchParams.get('ma_thi_hanh_an') : ''
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  // Check some data required before saving
  const checkBeforeSaving = () => {
    let haveError = false
    let errorContent = ''
    if (!['Tạo hồ sơ THA'].includes(state)) {
      if (!form.so_ban_an) {
        errorContent += 'Số Bản án, '
        haveError = true
      }
      if (!form.ngay_ra_ban_an) {
        errorContent += 'Ngày ra Bản án, '
        haveError = true
      }
      if (!form.so_tien_ban_an) {
        errorContent += 'Số tiền Bản án, '
        haveError = true
      }
      if (!form.noi_dung_ban_an) {
        errorContent += 'Nội dung Bản án, '
        haveError = true
      }
    }
    if (['Đang THA', 'Kết thúc THA'].includes(state)) {
      if (!form.chap_hanh_vien) {
        errorContent += 'Chấp hành viên, '
        haveError = true
      }
      if (!form.so_quyet_dinh) {
        errorContent += 'Số Quyết định, '
        haveError = true
      }
      if (!form.ngay_ra_quyet_dinh) {
        errorContent += 'Ngày ra Quyết định, '
        haveError = true
      }
      if (!form.so_tien_quyet_dinh) {
        errorContent += 'Số tiền Quyết định, '
        haveError = true
      }
    }
    errorContent = errorContent.substring(0, errorContent.length - 2)
    setError(errorContent)
    return haveError
  }

  const handleCreateAppointment = () => {
    addAppointment(appointments).then((res) => {
      if (!res || res.body !== 'Inserted') {
        showError2()
        return false
      }
    })
    return true
  }

  const handleCreateOrUpdate = () => {
    if (isCreateNew) {
      form.nguoi_thuc_hien = props.user.ho_ten
      addJudgment(form).then((res) => {
        if (res && res.ma_thi_hanh_an) {
          localStorage.setItem('addJudgment', 'success')
          router.push('/thi-hanh-an')
        }
      })
    } else {
      if (checkBeforeSaving()) {
        setShowError(true)
      } else {
        updateJudgment(id, form).then((res) => {
          if (res && res.ma_thi_hanh_an) {
            showSuccess()
          }
        })

        if (appointments.length > 0) {
          const result = handleCreateAppointment()
          if (!result) {
            return 'stop'
          }
          setAppointments([])
        }
      }
    }

    setConfirm(false)
  }

  const showSuccess = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Cập nhật thành công',
      life: 3000,
    })
  }

  const showError2 = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Cập nhật lịch hẹn thất bại',
      life: 3000,
    })
  }

  const getState = () => {
    if (isCreateNew) {
      return 'Tạo hồ sơ THA'
    }
    return state
  }

  const getJudgment = () => {
    getDetailJudgment(id).then((res) => {
      if (res && res.ma_thi_hanh_an) {
        setData(res)
        setState(res?.trang_thai)
        setForm({
          ...form,
          so_ban_an: res?.so_ban_an ? res?.so_ban_an : '',
          ngay_ra_ban_an: res?.ngay_ra_ban_an,
          so_tien_ban_an: res?.so_tien_ban_an,
          noi_dung_ban_an: res?.noi_dung_ban_an ? res?.noi_dung_ban_an : '',
          chap_hanh_vien: res?.chap_hanh_vien,
          so_quyet_dinh: res?.so_quyet_dinh,
          ngay_ra_quyet_dinh: res?.ngay_ra_quyet_dinh,
          so_tien_quyet_dinh: res?.so_tien_quyet_dinh,
        })
      }
    })
  }

  useEffect(() => {
    if (!isCreateNew && id) {
      getJudgment()
    }
  }, [])

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="Ở lại"
        // icon="pi pi-times"
        onClick={() => setDisplayConfirmation(false)}
        text
      />
      <Button
        type="button"
        label="Tiếp tục"
        // icon="pi pi-check"
        onClick={() => {
          setDisplayConfirmation(false)
          history.back()
        }}
        text
        autoFocus
      />
    </>
  )

  const errorFooter = (
    <>
      <Button type="button" label="Đóng" onClick={() => setShowError(false)} text />
    </>
  )

  return (
    <div className="card">
      <Toast ref={toast} />
      {/* Error: Some datas required haven't been filled before save  */}
      <Dialog
        header="Lỗi"
        visible={showError}
        onHide={() => setShowError(false)}
        style={{ width: '450px' }}
        modal
        footer={errorFooter}
      >
        <div className="flex align-items-center justify-content-center">
          <span>
            Bạn chưa điền các nội dung sau đây: <b>{error}</b>
          </span>
        </div>
      </Dialog>

      <Dialog
        header="Cảnh báo"
        visible={displayConfirmation}
        onHide={() => setDisplayConfirmation(false)}
        style={{ width: '350px' }}
        modal
        footer={confirmationDialogFooter}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>Những thay đổi của bạn chưa được lưu, bạn vẫn muốn tiếp tục quay lại chứ?</span>
        </div>
      </Dialog>

      {/* Back button */}
      <div
        className="relative cursor-pointer"
        onClick={() => {
          if (Object.keys(form).length > 0 || appointments.length > 0) {
            setDisplayConfirmation(true)
          } else {
            history.back()
          }
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '-9px',
          }}
        >
          <i className="pi pi-angle-left" style={{ color: 'slateblue', fontSize: '1.8rem' }}></i>
        </div>
        <div
          className="font-bold text-xl text-primary"
          style={{ lineHeight: '23px', marginLeft: '16px' }}
        >
          Quay lại
        </div>
      </div>

      <div className="flex mb-3 align-items-end justify-content-between" style={{ height: '41px' }}>
        <div className="flex">
          <div className="font-bold text-xl mr-2">Trạng thái hồ sơ: </div>
          <div className="font-bold text-xl text-primary">{getState()}</div>
        </div>
        {props.user.role === 'SHB' &&
          (!isCreateNew ? (
            <Button label="Lưu thay đổi" onClick={() => setConfirm(true)} />
          ) : (
            <Button label="Tạo hồ sơ" onClick={() => handleCreateOrUpdate()} />
          ))}

        <Dialog
          header="Lưu thay đổi"
          visible={confirm}
          onHide={() => setConfirm(false)}
          style={{ width: '350px' }}
          modal
        >
          <div>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              <span>Bạn có chắc chắn lưu thay đổi không?</span>
            </div>

            <div className="flex justify-content-center mt-5">
              <Button
                label="Hủy"
                severity="primary"
                outlined
                style={{ width: '80px', height: '36px' }}
                onClick={() => setConfirm(false)}
              />
              <Button
                label={isCreateNew ? 'Tạo' : 'Lưu'}
                style={{ width: '80px', height: '36px', marginLeft: '16px' }}
                onClick={() => handleCreateOrUpdate()}
              />
            </div>
          </div>
        </Dialog>
      </div>

      <LawsuitFileCustomerInfo
        form={form}
        setForm={setForm}
        isCreateNew={isCreateNew}
        data={data}
      />
      {!isCreateNew && (
        <VerdictContent form={form} setForm={setForm} data={data} role={props.user.role} />
      )}

      <AuthorizedStaffInfo form={form} setForm={setForm} isCreateNew={isCreateNew} data={data} />

      {!isCreateNew && (
        <>
          {props.user.role === 'SHB' && (
            <JudgmentActions
              data={data}
              state={state}
              form={form}
              setState={setState}
              setForm={setForm}
            />
          )}

          <LogInfo data={data} />
          <JudgmentAppointments
            state={state}
            appointments={appointments}
            setAppointments={setAppointments}
            id={id}
            data={data}
          />
          <JudgmentExecutionInfo
            form={form}
            setForm={setForm}
            data={data}
            state={state}
            role={props.user.role}
          />
          {/* <UpdateDecision /> */}
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(JudgmentExecutionFile)
