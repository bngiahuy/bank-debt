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
import DeXuat from '@/components/to-trinh/de-xuat/de-xuat'
import DanhGia from '@/components/to-trinh/danh-gia/danh-gia'
import TinhHinhXLNQuaHan from '@/components/to-trinh/tinh-hinh-xln-qua-han/tinh-hinh-xln-qua-han'

import {
  addTTDGKK,
  getDetailTTDGKK,
  updateTTDGKK,
} from 'actions/to-trinh-danh-gia-khoi-kien/to-trinh-danh-gia-khoi-kien'

const ChiTietToTrinhKhoiKien = (props) => {
  const toast = useRef(null)
  const [suggestion, setSuggestion] = useState({})
  const [evaluations, setEvaluations] = useState([])
  const [xlnSituation, setXlnSituation] = useState({})
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

  const handleAdd = () => {
    const body = {
      ma_khach_hang: selectedCustomer.ma_khach_hang,
      ma_nhan_vien: props.user.ma_nhan_vien,
      danh_gia: evaluations,
      toa_an: suggestion.toa_an,
      du_no_den_ngay: suggestion.du_no_den_ngay,
      von_goc: suggestion.von_goc,
      tong_du_no: suggestion.tong_du_no,
      pa_hoa_giai: suggestion.pa_hoa_giai,
      pa_xet_xu: suggestion.pa_xet_xu,
      dien_thoai: xlnSituation.dien_thoai,
      gui_thu_cong_van: xlnSituation.gui_thu_cong_van,
      den_nha_khach_hang: xlnSituation.den_nha_khach_hang,
      den_cong_ty: xlnSituation.den_cong_ty,
      tac_dong_khac: xlnSituation.tac_dong_khac,
    }
    addTTDGKK(body).then((res) => {
      if (res && res.ma_to_trinh) {
        localStorage.setItem('addTTDGKK', 'success')
        router.push('/to-trinh-khoi-kien')
      } else if (res && res.response?.status === 400) {
        showError()
      }
    })
  }

  const handleUpdate = () => {
    const body = {
      ma_nhan_vien: props.user.ma_nhan_vien,
      danh_gia: evaluations,
      toa_an: suggestion.toa_an,
      du_no_den_ngay: suggestion.du_no_den_ngay,
      von_goc: suggestion.von_goc,
      tong_du_no: suggestion.tong_du_no,
      pa_hoa_giai: suggestion.pa_hoa_giai,
      pa_xet_xu: suggestion.pa_xet_xu,
      dien_thoai: xlnSituation.dien_thoai,
      gui_thu_cong_van: xlnSituation.gui_thu_cong_van,
      den_nha_khach_hang: xlnSituation.den_nha_khach_hang,
      den_cong_ty: xlnSituation.den_cong_ty,
      tac_dong_khac: xlnSituation.tac_dong_khac,
    }
    updateTTDGKK(code, body).then((res) => {
      if (res && res.ma_to_trinh) {
        showSuccess()
      } else {
        showError()
      }
    })
  }

  const handleApprove = () => {
    updateTTDGKK(code, {
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
    updateTTDGKK(code, {
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

  const getDataDGKK = (data) => {
    setSuggestion({
      toa_an: data.toa_an,
      du_no_den_ngay: data.du_no_den_ngay,
      von_goc: data.von_goc,
      tong_du_no: data.tong_du_no,
      pa_hoa_giai: data.pa_hoa_giai,
      pa_xet_xu: data.pa_xet_xu,
    })
    setEvaluations([...data.danh_gia])
    setXlnSituation({
      dien_thoai: data.dien_thoai,
      gui_thu_cong_van: data.gui_thu_cong_van,
      den_nha_khach_hang: data.den_nha_khach_hang,
      den_cong_ty: data.den_cong_ty,
      tac_dong_khac: data.tac_dong_khac,
    })
  }

  useEffect(() => {
    if (code && !isCreateNew) {
      getDetailTTDGKK(code).then((res) => {
        if (res && res.ma_to_trinh) {
          setDetail(res)
          getDataDGKK(res)
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
          <Button label="Lưu thay đổi" style={{ height: '36px' }} onClick={() => handleUpdate()} />
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

      <DeXuat
        isCreateNew={isCreateNew}
        suggestion={suggestion}
        setSuggestion={setSuggestion}
        role={props.user.role}
        approvedOrRefused={detail.trang_thai !== 'Chưa duyệt'}
      />

      <DanhGia
        isCreateNew={isCreateNew}
        evaluations={evaluations}
        setEvaluations={setEvaluations}
        role={props.user.role}
        approvedOrRefused={detail.trang_thai !== 'Chưa duyệt'}
      />

      <TinhHinhXLNQuaHan
        isCreateNew={isCreateNew}
        xlnSituation={xlnSituation}
        setXlnSituation={setXlnSituation}
        role={props.user.role}
        approvedOrRefused={detail.trang_thai !== 'Chưa duyệt'}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ChiTietToTrinhKhoiKien)
