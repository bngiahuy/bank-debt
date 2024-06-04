'use client'
import Link from 'next/link'

import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

const ManageAppointmentTable = (props) => {
  const renderName = (rowData) => {
    return <div>{props.isFiltering ? rowData.ten_khach_hang : rowData.khach_hang?.ho_ten}</div>
  }

  const renderCCCD = (rowData) => {
    return <div>{props.isFiltering ? rowData.can_cuoc : rowData.khach_hang?.can_cuoc}</div>
  }

  const renderAuthorized = (rowData) => {
    if (props.isFiltering) {
      return <div>{rowData.ten_nhan_vien}</div>
    }

    return (
      <div>
        {rowData.khoi_kien
          ? rowData.khoi_kien?.nhan_vien?.ho_ten
          : rowData.thi_hanh_an?.nhan_vien?.ho_ten}
      </div>
    )
  }

  const renderProvince = (rowData) => {
    if (props.isFiltering) {
      if (rowData.ma_khoi_kien) {
        return <div>{rowData.tinh_tp_kk}</div>
      } else {
        return <div>{rowData.tinh_tp_tha}</div>
      }
    }

    return (
      <div>{rowData.khoi_kien ? rowData.khoi_kien?.tinh_tp : rowData.thi_hanh_an?.tinh_tp}</div>
    )
  }

  const renderDistrict = (rowData) => {
    if (props.isFiltering) {
      if (rowData.ma_khoi_kien) {
        return <div>{rowData.quan_huyen_kk}</div>
      } else {
        return <div>{rowData.quan_huyen_tha}</div>
      }
    }

    return (
      <div>
        {rowData.khoi_kien ? rowData.khoi_kien?.quan_huyen : rowData.thi_hanh_an?.quan_huyen}
      </div>
    )
  }

  const renderAppointmentDate = (rowData) => {
    const date = new Date(rowData.ngay_hen)
    return (
      <div>
        {date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/
        {date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/
        {date.getFullYear()}
      </div>
    )
  }

  const renderUpdateTime = (rowData) => {
    const data = props.isFiltering ? rowData.ngay_tao_lich_hen : rowData.created_at
    if (!data) {
      return <div></div>
    }
    const year = data.substr(0, 4)
    const month = data.substr(5, 2)
    const date = data.substr(8, 2)
    return (
      <div>
        {date}/{month}/{year}
      </div>
    )
  }

  const renderLawsuitStatus = (rowData) => {
    if (props.isFiltering) {
      if (rowData.ma_khoi_kien) {
        return <div>{rowData.trang_thai_kk}</div>
      }
    }
    if (rowData.ma_khoi_kien) {
      return <div>{rowData.trang_thai_ho_so}</div>
    }
  }

  const renderJudgmentStatus = (rowData) => {
    if (props.isFiltering) {
      if (rowData.ma_thi_hanh_an) {
        return <div>{rowData.trang_thai_tha}</div>
      }
    }
    if (rowData.ma_thi_hanh_an) {
      return <div>{rowData.trang_thai_ho_so}</div>
    }
  }

  // const renderTHA = (rowData) => {
  //   return (<div>
  //     {rowData.trang_thai_}
  //   </div>)
  // }
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
        <Column header="Tên khách hàng" style={{ minWidth: '12rem' }} body={renderName} />
        <Column header="Căn cước công dân" style={{ minWidth: '11rem' }} body={renderCCCD} />
        <Column
          header="Trạng thái khởi kiện"
          style={{ minWidth: '12rem' }}
          body={renderLawsuitStatus}
        />
        <Column
          header="Trạng thái thi hành án"
          style={{ minWidth: '13rem' }}
          body={renderJudgmentStatus}
        />
        <Column
          header="Người được ủy quyền"
          style={{ minWidth: '13rem' }}
          body={renderAuthorized}
        />
        <Column header="Tỉnh/Thành phố" style={{ minWidth: '10rem' }} body={renderProvince} />
        <Column header="Quận/huyện" style={{ minWidth: '9rem' }} body={renderDistrict} />
        <Column header="Ngày hẹn" style={{ minWidth: '7rem' }} body={renderAppointmentDate} />
        <Column field="noi_dung_hen" header="Nội dung" style={{ minWidth: '15rem' }} />
        <Column
          field={props.isFiltering ? 'ten_nhan_vien' : 'nhan_vien.ho_ten'}
          header="Nhân viên thực hiện"
          style={{ minWidth: '12rem' }}
        />
        <Column header="Ngày tạo lịch hẹn" style={{ minWidth: '12rem' }} body={renderUpdateTime} />
      </DataTable>
    </div>
  )
}

export default ManageAppointmentTable
