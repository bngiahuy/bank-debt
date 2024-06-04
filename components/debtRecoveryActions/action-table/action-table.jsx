'use client'
import Link from 'next/link'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'

const ActionTable = (props) => {
  const renderActionId = (rowData) => {
    return <div>{rowData.hanh_dong?.ma_hanh_dong}</div>
  }

  const renderCustomerName = (rowData) => {
    return <div>{rowData.khach_hang.ho_ten}</div>
  }

  const renderCCCD = (rowData) => {
    return <div>{rowData.khach_hang.can_cuoc}</div>
  }

  const handleClickCheckbox = (id) => {
    if (props.checkedList.indexOf(id) >= 0) {
      props.setCheckedList(props.checkedList.filter((item) => item !== id))
    } else {
      props.setCheckedList([...props.checkedList, id])
    }
  }

  const renderBtn = (rowData) => {
    return (
      <div style={{ display: 'flex' }}>
        {/* <Button
          label="Xem thông báo"
          severity="primary"
          style={{ width: '140px', height: '36px' }}
        /> */}
        <Button
          label="Cập nhật"
          severity="primary"
          style={{ width: '96px', height: '36px', marginLeft: '20px' }}
          onClick={() => {
            props.setIsUpdating(true)
            props.setShowUpdateDialog(true)
            props.setActionData(rowData)
            props.getData(rowData)
          }}
        />
      </div>
    )
  }

  const renderDate = (rowData) => {
    const date = new Date(rowData.ngay_cap_nhat)
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    return (
      <div>{day.toString() + '/' + month.toString() + '/' + date.getFullYear().toString()}</div>
    )
  }

  return (
    <div>
      <DataTable
        value={props.data}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="id"
        // filters={filters1}
        // filterDisplay='menu'
        responsiveLayout="scroll"
        emptyMessage="Không có dữ liệu"
        // header={header1}
      >
        {/* <Column header="Mã khách hàng" style={{ minWidth: '10rem' }} body={renderCustomerId} /> */}
        <Column header="Mã hành động" style={{ minWidth: '10rem' }} body={renderActionId} />
        <Column
          field="hanh_dong.loai_hanh_dong"
          header="Loại hành động"
          style={{ minWidth: '12rem' }}
        />
        <Column
          field="hanh_dong.ten_hanh_dong"
          header="Tên hành động"
          style={{ minWidth: '12rem' }}
        />
        <Column header="Tên khách hàng" style={{ minWidth: '12rem' }} body={renderCustomerName} />
        <Column header="Căn cước công dân" style={{ minWidth: '11rem' }} body={renderCCCD} />
        <Column field="ket_qua.ma_ket_qua" header="Mã kết quả" style={{ minWidth: '12rem' }} />
        <Column field="ket_qua.ghi_chu_ket_qua" header="Kết quả" style={{ minWidth: '12rem' }} />
        <Column field="ghi_chu" header="Ghi chú" style={{ minWidth: '12rem' }} />
        <Column
          field="nhan_vien.ho_ten"
          header="Nhân viên thực hiện"
          style={{ minWidth: '12rem' }}
        />
        <Column header="Ngày thực hiện" style={{ minWidth: '10rem' }} body={renderDate} />
        {props.role === 'SHB' && (
          <Column header="" style={{ minWidth: '12rem' }} body={renderBtn} />
        )}
      </DataTable>
    </div>
  )
}

export default ActionTable
