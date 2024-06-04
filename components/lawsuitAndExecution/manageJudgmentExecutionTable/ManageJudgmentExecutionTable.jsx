'use client'
import Link from 'next/link'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Checkbox } from 'primereact/checkbox'

const ManageJudgmentExecutionTable = (props) => {
  const handleClickCheckbox = (id) => {
    if (props.checkedList.indexOf(id) >= 0) {
      props.setCheckedList(props.checkedList.filter((item) => item !== id))
    } else {
      props.setCheckedList([...props.checkedList, id])
    }
  }

  const renderCustomerName = (rowData) => {
    return (
      <div>
        {rowData.khach_hang.ho_ten} ({rowData.ma_khach_hang})
      </div>
    )
  }

  const renderCustomerCCCD = (rowData) => {
    return <div>{rowData.khach_hang.can_cuoc}</div>
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

  const renderAuthorizedStaff = (rowData) => {
    return (
      <div>
        {rowData.nhan_vien?.ho_ten} ({rowData.id_nguoi_duoc_uq})
      </div>
    )
  }

  const renderDetailBtn = (rowData) => {
    return <Link href={`thi-hanh-an/ho-so?ma_thi_hanh_an=${rowData.ma_thi_hanh_an}`}>Chi tiết</Link>
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
        <Column header="" style={{ minWidth: '4px' }} body={renderCheckbox} />
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
        <Column field="trang_thai" header="Trạng thái thi hành án" style={{ minWidth: '13rem' }} />
        <Column field="tinh_tp" header="Tỉnh/Thành phố" style={{ minWidth: '10rem' }} />
        <Column field="quan_huyen" header="Quận/huyện" style={{ minWidth: '12rem' }} />
        <Column
          header="Ngày tạo thi hành án"
          style={{ minWidth: '12rem' }}
          body={renderCreatedAt}
        />
        <Column header="" style={{ minWidth: '5.5rem' }} body={renderDetailBtn} />
      </DataTable>
    </div>
  )
}

export default ManageJudgmentExecutionTable
