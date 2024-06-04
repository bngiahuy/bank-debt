'use client'
import Link from 'next/link'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Checkbox } from 'primereact/checkbox'

const ManageLawsuitTable = (props) => {
  const renderCustomerId = (rowData) => {
    return <div>{rowData.ma_khach_hang}</div>
  }

  const renderCustomerName = (rowData) => {
    return <div>{props.isFiltering ? rowData.ho_ten : rowData.khach_hang?.ho_ten}</div>
  }

  const renderCustomerCCCD = (rowData) => {
    return <div>{props.isFiltering ? rowData.can_cuoc : rowData.khach_hang?.can_cuoc}</div>
  }

  const handleClickCheckbox = (id) => {
    if (props.checkedList.indexOf(id) >= 0) {
      props.setCheckedList(props.checkedList.filter((item) => item !== id))
    } else {
      props.setCheckedList([...props.checkedList, id])
    }
  }

  const renderCheckbox = (rowData) => {
    return (
      <Checkbox
        inputId="checkOption1"
        name="option"
        value={rowData.ma_khach_hang}
        checked={props.checkedList.indexOf(rowData.ma_khach_hang) >= 0}
        onChange={(e) => handleClickCheckbox(e.value)}
      />
    )
  }

  const renderCreatedAt = (rowData) => {
    const dateTime = new Date(rowData.created_at)
    const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
    const month =
      dateTime.getMonth() + 1 < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1
    const year = dateTime.getFullYear()
    return <div>{date + '/' + month + '/' + year}</div>
  }

  const renderDetailBtn = (rowData) => {
    return <Link href={`khoi-kien/ho-so?ma_khoi_kien=${rowData.ma_khoi_kien}`}>Chi tiết</Link>
  }

  const renderAuthorizedStaff = (rowData) => {
    return (
      <div>
        {props.isFiltering ? rowData.ten_nv_uy_quyen : rowData.nhan_vien?.ho_ten} (
        {props.isFiltering ? rowData.ma_nv_uy_quyen : rowData.id_nguoi_duoc_uq})
      </div>
    )
  }

  return (
    <div>
      <DataTable
        value={props.lawsuits}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="ma_khoi_kien"
        // filters={filters1}
        // filterDisplay='menu'
        responsiveLayout="scroll"
        emptyMessage="Không có dữ liệu"
        // header={header1}
      >
        <Column header="" style={{ minWidth: '4px' }} body={renderCheckbox} />
        <Column header="Mã khách hàng" style={{ minWidth: '10rem' }} body={renderCustomerId} />
        <Column
          header="Họ và tên"
          style={{ minWidth: '12rem' }}
          sortable
          body={renderCustomerName}
        />
        <Column
          header="Căn cước công dân"
          style={{ minWidth: '11rem' }}
          body={renderCustomerCCCD}
        />
        <Column
          header="Người được ủy quyền"
          style={{ minWidth: '17rem' }}
          body={renderAuthorizedStaff}
        />
        <Column field="so_tien_kk" header="Số tiền khởi kiện" style={{ minWidth: '10rem' }} />
        <Column field="trang_thai" header="Trạng thái khởi kiện" style={{ minWidth: '12rem' }} />
        {/* <Column field="phu_trach_2" header="Trạng thái án phí" style={{ minWidth: '12rem' }} /> */}
        <Column field="tinh_tp" header="Tỉnh/Thành phố" style={{ minWidth: '10rem' }} />
        <Column field="quan_huyen" header="Quận/huyện" style={{ minWidth: '9rem' }} />
        <Column header="Ngày tạo khởi kiện" style={{ minWidth: '12rem' }} body={renderCreatedAt} />
        <Column header="" style={{ minWidth: '5.5rem' }} body={renderDetailBtn} />
      </DataTable>
    </div>
  )
}

export default ManageLawsuitTable
