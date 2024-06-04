'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { connect } from 'react-redux'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import 'primeicons/primeicons.css'

import ThongTinKhachHang from '@/components/to-trinh/thong-tin-khach-hang/thong-tin-khach-hang'
import ThongTinGiamLai from '@/components/to-trinh/thong-tin-giam-lai/thong-tin-giam-lai'

import { addTTMG, getDetailTTMG, updateTTMG } from 'actions/to-trinh-mien-giam/to-trinh-mien-giam'

const ChiTietToTrinhMienGiam = (props) => {
  const toast = useRef(null)
  const [displayConfirmation, setDisplayConfirmation] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState([])
  const [amountToBePaid, setAmountToBePaid] = useState(null)
  const [amountToBeDecreased, setAmountToBeDecreased] = useState(null)
  const [calendarValue, setCalendarValue] = useState(null)
  const [detail, setDetail] = useState({})
  const [canPressSave, setCanPressSave] = useState(false)
  const searchParams = useSearchParams()
  const isCreateNew = searchParams.get('createNew')
  const code = searchParams.get('ma_to_trinh') ? searchParams.get('ma_to_trinh') : ''
  const router = useRouter()

  const showSuccess = (content) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Thành công',
      detail: content ? content : 'Cập nhật thành công',
      life: 3000,
    })
  }

  const showError = (content) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Lỗi',
      detail: content ? content : 'Cập nhật thất bại',
      life: 3000,
    })
  }

  const convertDateObjToStr = () => {
    const dateTime = new Date(calendarValue)
    const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
    const month =
      dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1
    const year = dateTime.getFullYear()
    return `${year}-${month}-${date}`
  }

  const handleAdd = () => {
    const body = {
      so_tien_can_thanh_toan: amountToBePaid,
      han_thanh_toan: convertDateObjToStr(),
      so_tien_lai_giam: amountToBeDecreased,
      ma_khach_hang: selectedCustomer.ma_khach_hang,
      ma_nhan_vien: props.user.ma_nhan_vien,
    }
    addTTMG(body).then((res) => {
      if (res && res.ma_to_trinh) {
        localStorage.setItem('addTTMG', 'success')
        router.push('/to-trinh-mien-giam')
      } else if (res && res.response?.status === 400) {
        showError()
      }
    })
  }

  const handleUpdate = () => {
    const body = {
      so_tien_can_thanh_toan: amountToBePaid,
      han_thanh_toan: convertDateObjToStr(),
      so_tien_lai_giam: amountToBeDecreased,
    }
    updateTTMG(code, body).then((res) => {
      if (res && res.ma_to_trinh) {
        showSuccess()
        setCanPressSave(false)
      } else {
        showError()
      }
    })
  }

  const handleApprove = () => {
    updateTTMG(code, {
      action: 'approve',
    }).then((res) => {
      if (res && res.ma_to_trinh) {
        setDetail({ ...detail, trang_thai: 'Đã duyệt' })
        showSuccess('Phê duyệt thành công')
      } else {
        showError('Phê duyệt thất bại')
      }
    })
  }

  const handleDecline = () => {
    updateTTMG(code, {
      action: 'decline',
    }).then((res) => {
      if (res && res.ma_to_trinh) {
        setDetail({ ...detail, trang_thai: 'Đã từ chối' })
        showSuccess('Từ chối thành công')
      } else {
        showError('Từ chối thất bại')
      }
    })
  }

  const getDataMG = (data) => {
    setAmountToBePaid(data.so_tien_can_thanh_toan)
    setAmountToBeDecreased(data.so_tien_lai_giam)
    let date = new Date()
    const year = data.han_thanh_toan.substring(0, 4)
    const month = Number(data.han_thanh_toan.substring(5, 7)) - 1
    const day = data.han_thanh_toan.substring(8, 10)
    date.setDate(day)
    date.setMonth(month)
    date.setFullYear(year)
    setCalendarValue(date)
  }

  useEffect(() => {
    if (code && !isCreateNew) {
      getDetailTTMG(code).then((res) => {
        if (res && res.ma_to_trinh) {
          setDetail(res)
          getDataMG(res)
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

      <div className="flex justify-content-between">
        <div
          className="mb-4 relative cursor-pointer"
          onClick={() => {
            if (
              (isCreateNew &&
                (Object.keys(selectedCustomer).length > 0 ||
                  amountToBePaid ||
                  amountToBeDecreased ||
                  calendarValue > 0)) ||
              (!isCreateNew && canPressSave)
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
        {isCreateNew && (
          <Button
            label="Thêm"
            style={{ height: '36px', width: '100px' }}
            onClick={() => handleAdd()}
          />
        )}
        {props.user.role === 'SHB' && detail.trang_thai === 'Chưa duyệt' && (
          <Button
            label="Lưu thay đổi"
            style={{ height: '36px' }}
            onClick={() => handleUpdate()}
            disabled={!canPressSave}
          />
        )}
        {props.user.role === 'NPD' && detail.trang_thai === 'Chưa duyệt' && (
          <div>
            <Button
              label="Từ chối"
              severity="danger"
              outlined
              style={{ height: '36px' }}
              onClick={() => handleDecline()}
              className="mr-3"
            />
            <Button label="Phê duyệt" style={{ height: '36px' }} onClick={() => handleApprove()} />
          </div>
        )}
      </div>

      {!isCreateNew && code && (
        <div className="font-bold text-xl mb-3">
          Mã tờ trình: <span className="text-primary">{code}</span>
        </div>
      )}

      <ThongTinKhachHang
        isCreateNew={isCreateNew}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        detail={detail}
      />
      <ThongTinGiamLai
        isCreateNew={isCreateNew}
        amountToBePaid={amountToBePaid}
        setAmountToBePaid={setAmountToBePaid}
        calendarValue={calendarValue}
        setCalendarValue={setCalendarValue}
        amountToBeDecreased={amountToBeDecreased}
        setAmountToBeDecreased={setAmountToBeDecreased}
        detail={detail}
        setCanPressSave={setCanPressSave}
        role={props.user.role}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ChiTietToTrinhMienGiam)
