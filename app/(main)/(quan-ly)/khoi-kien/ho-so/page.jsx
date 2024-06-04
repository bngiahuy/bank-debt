'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { connect } from 'react-redux'

import LawsuitFileCustomerInfo from '@/components/lawsuitFileDetail/lawsuitFileCustomerInfo/LawsuitFileCustomerInfo'
import LawsuitFileCreditInfo from '@/components/lawsuitFileDetail/lawsuitFileCreditInfo/LawsuitFileCreditInfo'
import LawsuitFileConsumerCreditInfo from '@/components/lawsuitFileDetail/lawsuitFileConsumerCreditInfo/LawsuitFileConsumerCreditInfo'
import AuthorizedStaffInfo from '@/components/lawsuitFileDetail/authorizedStaffInfo/AuthorizedStaffInfo'
import LawsuitFileActions from '@/components/lawsuitFileDetail/lawsuitFileActions/LawsuitFileActions'
import LogInfo from '@/components/lawsuitFileDetail/logInfo/LogInfo'
import LawsuitFileAppointment from '@/components/lawsuitFileDetail/lawsuit-file-appointment/lawsuit-file-appointment'
import LawsuitFileNotification from '@/components/lawsuitFileDetail/lawsuitFileNotification/LawsuitFileNotification'
import LawsuitFileTUAP from '@/components/lawsuitFileDetail/lawsuit-file-TUAP/lawsuit-file-TUAP'

import {
  addLawsuit,
  getDetailLawsuit,
  updateLawsuit,
} from 'actions/tien-do-khoi-kien/tien-do-khoi-kien'
import { addAppointment } from 'actions/lich-hen/lich-hen'
import { addTUAP } from 'actions/tam-ung-an-phi/tam-ung-an-phi'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css'

const LawsuitFile = (props) => {
  const toast = useRef(null)
  const [form, setForm] = useState({})
  const [data, setData] = useState({})
  const [operation, setOperation] = useState('')
  const [state, setState] = useState('')
  const [appointments, setAppointments] = useState([])
  const [displayConfirmation, setDisplayConfirmation] = useState(false)
  const [tuapForm, setTuapForm] = useState([])
  const searchParams = useSearchParams()
  const isCreateNew = searchParams.get('createNew')
  const id = searchParams.get('ma_khoi_kien') ? searchParams.get('ma_khoi_kien') : ''
  const router = useRouter()

  const handleSave = () => {
    const bodyToCreate = {
      ma_khach_hang: form.ma_khach_hang,
      tinh_tp: form.tinh_tp,
      quan_huyen: form.quan_huyen,
      id_nguoi_duoc_uq: form.id_nguoi_duoc_uq,
      so_tien_kk: 100000000,
      nguoi_thuc_hien: props.user.ho_ten,
    }

    const bodyToUpdate = {
      trang_thai: state,
      thao_tac: operation,
      nguoi_thuc_hien: 'Lê Văn Bằng',
    }

    if (isCreateNew) {
      addLawsuit(bodyToCreate).then((res) => {
        if (res && res.ma_khoi_kien) {
          localStorage.setItem('addLawsuit', 'success')
          router.push('/khoi-kien')
        }
      })
    } else {
      if (operation) {
        updateLawsuit(id, bodyToUpdate).then((res) => {
          if (!res || !res.ma_khoi_kien) {
            showError1()
            return 'stop'
          }
          setOperation('')
        })
      }

      if (appointments.length > 0) {
        const result = handleCreateAppointment()
        if (!result) {
          return 'stop'
        }
        setAppointments([])
      }

      if (tuapForm.length > 0) {
        const result = handleCreateTUAP()
        if (!result) {
          return 'stop'
        }
        setTuapForm([])
      }

      showSuccess()

      getDetailLawsuit(id).then((res) => {
        if (res && res.ma_khoi_kien) {
          setData(res)
        }
      })
    }
  }

  const showSuccess = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Cập nhật thành công',
      life: 3000,
    })
  }

  const showError1 = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Cập nhật trạng thái thất bại',
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

  const showError3 = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Cập nhật TUAP thất bại',
      life: 3000,
    })
  }

  const getState = () => {
    if (isCreateNew) {
      return 'Nhập mới'
    }
    return state
  }

  const handleCreateAppointment = () => {
    addAppointment(appointments).then((res) => {
      if (!res || !res.id) {
        showError2()
        return false
      }
    })
    return true
  }

  const handleCreateTUAP = () => {
    addTUAP(tuapForm).then((res) => {
      if (!res || !res.id) {
        showError3()
        return false
      }
    })
    return true
  }

  useEffect(() => {
    if (!isCreateNew && id) {
      getDetailLawsuit(id).then((res) => {
        if (res && res.ma_khoi_kien) {
          setData(res)
          setState(res.trang_thai)
        }
      })
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

  return (
    <div className="card">
      <Toast ref={toast} />
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

      <div
        className="relative cursor-pointer"
        onClick={() => {
          if (
            Object.keys(form).length > 0 ||
            operation ||
            appointments.length > 0 ||
            tuapForm.length > 0
          ) {
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
        {/* {Object.keys(form).length > 0 ||
        operation ||
        appointments.length > 0 ||
        tuapForm.length > 0 ? (
          <Button
            label={isCreateNew ? 'Thêm' : 'Lưu thay đổi'}
            style={isCreateNew ? { height: '36px', width: '100px' } : { height: '36px' }}
            onClick={() => handleSave()}
            disabled={
              !(
                Object.keys(form).length > 0 ||
                operation ||
                appointments.length > 0 ||
                tuapForm.length > 0
              )
            }
          />
        ) : (
          <Button label="Lưu thay đổi" style={{ height: '36px' }} disabled />
        )} */}
        {props.user.role === 'SHB' && (
          <Button
            label={isCreateNew ? 'Thêm' : 'Lưu thay đổi'}
            style={isCreateNew ? { height: '36px', width: '100px' } : { height: '36px' }}
            onClick={() => handleSave()}
            disabled={
              !(
                Object.keys(form).length > 0 ||
                operation ||
                appointments.length > 0 ||
                tuapForm.length > 0
              )
            }
          />
        )}
      </div>
      <LawsuitFileCustomerInfo
        form={form}
        setForm={setForm}
        isCreateNew={isCreateNew}
        data={data}
      />
      {((isCreateNew && form.ma_khach_hang) || !isCreateNew) && (
        <>
          <LawsuitFileCreditInfo form={form} />
          <LawsuitFileConsumerCreditInfo form={form} />
        </>
      )}

      <AuthorizedStaffInfo form={form} setForm={setForm} isCreateNew={isCreateNew} data={data} />
      {!isCreateNew && props.user.role === 'SHB' && (
        <LawsuitFileActions
          data={data}
          state={state}
          setState={setState}
          setOperation={setOperation}
        />
      )}
      {/* {!isCreateNew && (
        <LawsuitFileNotification checkedList={checkedList} setCheckedList={setCheckedList} />
      )} */}
      {!isCreateNew && <LogInfo data={data} />}
      {!isCreateNew && (
        <LawsuitFileTUAP
          state={state}
          appointments={appointments}
          setAppointments={setAppointments}
          id={id}
          data={data}
          tuapForm={tuapForm}
          setTuapForm={setTuapForm}
        />
      )}
      {!isCreateNew && (
        <LawsuitFileAppointment
          state={state}
          appointments={appointments}
          setAppointments={setAppointments}
          id={id}
          data={data}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(LawsuitFile)
