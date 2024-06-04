import React, { useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Accordion, AccordionTab } from 'primereact/accordion'

const InformationTemplate = (props) => {
  const [showDetail, setShowDetail] = useState(false)

  const renderDate = (rowData) => {
    const date = rowData.created_at
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
    return (
      <div>
        {day}/{month}/{year}
      </div>
    )
  }

  const renderNewCustomerTable = () => {
    return (
      <div>
        <DataTable
          value={props.data?.new_khach_hang}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay="menu"
          emptyMessage="Không có khách hàng mới nào"
        >
          <Column field="ma_khach_hang" header="Mã khách hàng" style={{ minWidth: '9rem' }} />
          <Column field="ho_ten" header="Họ và tên" style={{ minWidth: '12rem' }} />
          <Column field="can_cuoc" header="Căn cước công dân" style={{ minWidth: '11rem' }} />
          <Column field="email" header="Email" style={{ minWidth: '12rem' }} />
          <Column field="dien_thoai" header="Số điện thoại" style={{ minWidth: '9rem' }} />
          <Column field="thuong_tru" header="Địa chỉ thường trú" style={{ minWidth: '12rem' }} />
          <Column field="tam_tru" header="Địa chỉ tạm trú" style={{ minWidth: '12rem' }} />
          <Column
            field="nhan_vien_phu_trach_1"
            header="Nhân viên phụ trách 1"
            style={{ minWidth: '13rem' }}
          />
        </DataTable>
      </div>
    )
  }

  const renderDebtRecoveryTable1 = () => {
    return (
      <div>
        <DataTable
          value={props.data?.customersHaventBeenRecoveried}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay="menu"
          emptyMessage="Không có khách hàng mới nào chưa tiến hành thu hồi nợ"
        >
          <Column field="ma_khach_hang" header="Mã khách hàng" style={{ minWidth: '9rem' }} />
          <Column field="ho_ten" header="Họ và tên" style={{ minWidth: '12rem' }} />
          <Column field="can_cuoc" header="Căn cước công dân" style={{ minWidth: '11rem' }} />
          <Column field="email" header="Email" style={{ minWidth: '12rem' }} />
          <Column field="dien_thoai" header="Số điện thoại" style={{ minWidth: '9rem' }} />
          <Column field="thuong_tru" header="Địa chỉ thường trú" style={{ minWidth: '12rem' }} />
          <Column field="tam_tru" header="Địa chỉ tạm trú" style={{ minWidth: '12rem' }} />
          <Column
            field="nhan_vien_phu_trach_1"
            header="Nhân viên phụ trách 1"
            style={{ minWidth: '13rem' }}
          />
        </DataTable>
      </div>
    )
  }

  const renderDebtRecoveryTable2 = () => {
    return (
      <div>
        <DataTable
          value={props.data?.customers7Days}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay="menu"
          emptyMessage="Không có khách hàng nào chưa thu hồi nợ hơn 7 ngày"
        >
          <Column field="ma_khach_hang" header="Mã khách hàng" style={{ minWidth: '9rem' }} />
          <Column field="ho_ten" header="Họ và tên" style={{ minWidth: '12rem' }} />
          <Column field="can_cuoc" header="Căn cước công dân" style={{ minWidth: '11rem' }} />
          <Column field="email" header="Email" style={{ minWidth: '12rem' }} />
          <Column field="dien_thoai" header="Số điện thoại" style={{ minWidth: '9rem' }} />
          <Column field="thuong_tru" header="Địa chỉ thường trú" style={{ minWidth: '12rem' }} />
          <Column field="tam_tru" header="Địa chỉ tạm trú" style={{ minWidth: '12rem' }} />
          <Column
            field="nhan_vien_phu_trach_1"
            header="Nhân viên phụ trách 1"
            style={{ minWidth: '13rem' }}
          />
        </DataTable>
      </div>
    )
  }

  const renderDebtRecoveryTable = () => {
    return (
      <Accordion>
        <AccordionTab header="Danh sách các khách hàng mới chưa thực hiện thu hồi nợ">
          {renderDebtRecoveryTable1()}
        </AccordionTab>
        <AccordionTab header="Danh sách các khách hàng chưa thực hiện thu hồi nợ hơn 1 tuần">
          {renderDebtRecoveryTable2()}
        </AccordionTab>
      </Accordion>
    )
  }

  const renderCustomer = (rowData) => {
    return (
      <div>
        {rowData.khach_hang.ho_ten} ({rowData.khach_hang.ma_khach_hang})
      </div>
    )
  }

  const renderStaff = (rowData) => {
    return (
      <div>
        {rowData.nhan_vien.ho_ten} ({rowData.nhan_vien.ma_nhan_vien})
      </div>
    )
  }

  const renderTTDGKK1 = () => {
    return (
      <div>
        <div>
          <DataTable
            value={props.data?.ttdgkkNotApproved}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={5}
            dataKey="id"
            // filters={filters1}
            // filterDisplay="menu"
            emptyMessage="Không có tờ trình đánh giá khởi kiện nào chưa được phê duyệt"
          >
            <Column field="ma_to_trinh" header="Mã tờ trình" style={{ minWidth: '9rem' }} />
            <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
            <Column field="trang_thai" header="Trạng thái" style={{ minWidth: '11rem' }} />
            <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          </DataTable>
        </div>
      </div>
    )
  }

  const renderTTDGKK2 = () => {
    return (
      <div>
        <div>
          <DataTable
            value={props.data?.ttdgkkApproved}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={5}
            dataKey="id"
            // filters={filters1}
            // filterDisplay="menu"
            emptyMessage="Không có tờ trình đánh giá khởi kiện nào đã được phê duyệt"
          >
            <Column field="ma_to_trinh" header="Mã tờ trình" style={{ minWidth: '9rem' }} />
            <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
            <Column field="trang_thai" header="Trạng thái" style={{ minWidth: '11rem' }} />
            <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          </DataTable>
        </div>
      </div>
    )
  }

  const renderTTDGKK3 = () => {
    return (
      <div>
        <div>
          <DataTable
            value={props.data?.ttdgkkDeclined}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={5}
            dataKey="id"
            // filters={filters1}
            // filterDisplay="menu"
            emptyMessage="Không có tờ trình đánh giá khởi kiện nào đã bị từ chối"
          >
            <Column field="ma_to_trinh" header="Mã tờ trình" style={{ minWidth: '9rem' }} />
            <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
            <Column field="trang_thai" header="Trạng thái" style={{ minWidth: '11rem' }} />
            <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          </DataTable>
        </div>
      </div>
    )
  }

  const renderTTDGKK = () => {
    return (
      <Accordion>
        <AccordionTab header="Danh sách các tờ trình đánh giá khởi kiện chưa được phê duyệt">
          {renderTTDGKK1()}
        </AccordionTab>
        {props.isSHB && (
          <AccordionTab header="Danh sách các tờ trình đánh giá khởi kiện đã được phê duyệt">
            {renderTTDGKK2()}
          </AccordionTab>
        )}
        {props.isSHB && (
          <AccordionTab header="Danh sách các tờ trình đánh giá khởi kiện đã bị từ chối">
            {renderTTDGKK3()}
          </AccordionTab>
        )}
      </Accordion>
    )
  }

  const renderTTMG1 = () => {
    return (
      <div>
        <div>
          <DataTable
            value={props.data?.ttmgNotApproved}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={5}
            dataKey="id"
            // filters={filters1}
            // filterDisplay="menu"
            emptyMessage="Không có tờ trình miễn giảm nào chưa được phê duyệt"
          >
            <Column field="ma_to_trinh" header="Mã tờ trình" style={{ minWidth: '9rem' }} />
            <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
            <Column field="trang_thai" header="Trạng thái" style={{ minWidth: '11rem' }} />
            <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          </DataTable>
        </div>
      </div>
    )
  }

  const renderTTMG2 = () => {
    return (
      <div>
        <div>
          <DataTable
            value={props.data?.ttmgApproved}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={5}
            dataKey="id"
            // filters={filters1}
            // filterDisplay="menu"
            emptyMessage="Không có tờ trình miễn giảm nào đã được phê duyệt"
          >
            <Column field="ma_to_trinh" header="Mã tờ trình" style={{ minWidth: '9rem' }} />
            <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
            <Column field="trang_thai" header="Trạng thái" style={{ minWidth: '11rem' }} />
            <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          </DataTable>
        </div>
      </div>
    )
  }

  const renderTTMG3 = () => {
    return (
      <div>
        <div>
          <DataTable
            value={props.data?.ttmgDeclined}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={5}
            dataKey="id"
            // filters={filters1}
            // filterDisplay="menu"
            emptyMessage="Không có tờ trình miễn giảm nào đã bị từ chối"
          >
            <Column field="ma_to_trinh" header="Mã tờ trình" style={{ minWidth: '9rem' }} />
            <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
            <Column field="trang_thai" header="Trạng thái" style={{ minWidth: '11rem' }} />
            <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          </DataTable>
        </div>
      </div>
    )
  }

  const renderTTMG = () => {
    return (
      <Accordion>
        <AccordionTab header="Danh sách các tờ trình miễn giảm chưa được phê duyệt">
          {renderTTMG1()}
        </AccordionTab>
        {props.isSHB && (
          <AccordionTab header="Danh sách các tờ trình miễn giảm đã được phê duyệt">
            {renderTTMG2()}
          </AccordionTab>
        )}
        {props.isSHB && (
          <AccordionTab header="Danh sách các tờ trình miễn giảm đã bị từ chối">
            {renderTTMG3()}
          </AccordionTab>
        )}
      </Accordion>
    )
  }

  const renderKK = () => {
    return (
      <div>
        <DataTable
          value={props.data?.customersInLawsuit}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay="menu"
          emptyMessage="Không có khách hàng nào đang trong quá trình khởi kiện"
        >
          <Column field="ma_khoi_kien" header="Mã khởi kiện" style={{ minWidth: '9rem' }} />
          <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
          <Column field="so_tien_kk" header="Số tiền khởi kiện" style={{ minWidth: '11rem' }} />
          <Column field="trang_thai" header="Trạng thái khởi kiện" style={{ minWidth: '11rem' }} />
          <Column field="tinh_tp" header="Tỉnh/Thành phố" style={{ minWidth: '11rem' }} />
          <Column field="quan_huyen" header="Quận/Huyện" style={{ minWidth: '11rem' }} />
          <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          <Column header="Ngày tạo khởi kiện" style={{ minWidth: '11rem' }} body={renderDate} />
        </DataTable>
      </div>
    )
  }

  const renderTHA = () => {
    return (
      <div>
        <DataTable
          value={props.data?.customersInJudgmentExecution}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay="menu"
          emptyMessage="Không có khách hàng nào đang trong quá trình thi hành án"
        >
          <Column field="ma_thi_hanh_an" header="Mã thi hành án" style={{ minWidth: '9rem' }} />
          <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
          <Column
            field="trang_thai"
            header="Trạng thái thi hành án"
            style={{ minWidth: '11rem' }}
          />
          <Column field="tinh_tp" header="Tỉnh/Thành phố" style={{ minWidth: '11rem' }} />
          <Column field="quan_huyen" header="Quận/Huyện" style={{ minWidth: '11rem' }} />
          <Column header="Nhân viên phụ trách" style={{ minWidth: '12rem' }} body={renderStaff} />
          <Column header="Ngày tạo thi hành án" style={{ minWidth: '11rem' }} body={renderDate} />
        </DataTable>
      </div>
    )
  }

  const renderKKAndTHA = () => {
    return (
      <Accordion>
        <AccordionTab header="Danh sách các khách hàng đang trong quá trình khởi kiện">
          {renderKK()}
        </AccordionTab>
        <AccordionTab header="Danh sách các khách hàng đang trong quá trình thi hành án">
          {renderTHA()}
        </AccordionTab>
      </Accordion>
    )
  }

  const renderApointmentKKState = (rowData) => {
    if (rowData.ma_khoi_kien) {
      return <div>{rowData.trang_thai_ho_so}</div>
    }
  }

  const renderApointmentTHAState = (rowData) => {
    if (rowData.ma_thi_hanh_an) {
      return <div>{rowData.trang_thai_ho_so}</div>
    }
  }

  const renderAppointmentDate = (rowData) => {
    const date = new Date(rowData.ngay_hen)
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()
    return (
      <div>
        {day}/{month}/{year}
      </div>
    )
  }

  const renderAppointments = () => {
    return (
      <div>
        <DataTable
          value={props.data?.next3DaysApointments}
          paginator
          className="p-datatable-gridlines"
          showGridlines
          rows={5}
          dataKey="id"
          // filters={filters1}
          // filterDisplay="menu"
          emptyMessage="Không có lịch hẹn nào sắp tới hẹn trong 3 ngày tới"
        >
          <Column header="Khách hàng" style={{ minWidth: '12rem' }} body={renderCustomer} />
          <Column
            header="Trạng thái khởi kiện"
            style={{ minWidth: '11rem' }}
            body={renderApointmentKKState}
          />
          <Column
            header="Trạng thái thi hành án"
            style={{ minWidth: '11rem' }}
            body={renderApointmentTHAState}
          />
          <Column header="Ngày hẹn" style={{ minWidth: '11rem' }} body={renderAppointmentDate} />
          <Column field="noi_dung_hen" header="Nội dung hẹn" style={{ minWidth: '14rem' }} />
          <Column header="Nhân viên thực hiện" style={{ minWidth: '12rem' }} body={renderStaff} />
          <Column header="Ngày tạo thi hành án" style={{ minWidth: '11rem' }} body={renderDate} />
        </DataTable>
      </div>
    )
  }

  const renderDetailContent = () => {
    if (props.title === 'Khách hàng') {
      return renderNewCustomerTable()
    }
    if (props.title === 'Thu hồi nợ') {
      return renderDebtRecoveryTable()
    }
    if (props.title === 'Tờ trình đánh giá khởi kiện') {
      return renderTTDGKK()
    }
    if (props.title === 'Tờ trình miễn giảm') {
      return renderTTMG()
    }
    if (props.title === 'Khởi kiện và thi hành án') {
      return renderKKAndTHA()
    }
    if (props.title === 'Lịch hẹn') {
      return renderAppointments()
    }
  }

  return (
    <div className="col-12 xl:col-6">
      <div className="card mb-0" style={{ height: '100%' }}>
        <div className="mb-4">
          <div
            className="flex justify-content-between align-items-center"
            style={{ height: '41px' }}
          >
            <div className="text-primary-500 font-medium text-900 text-xl">{props.title}</div>
            <div className="flex align-items-center">
              {/* {props.isNewCustomer && filter.name === 'Chọn ngày cụ thể' && (
                <Button
                  icon="pi pi-undo"
                  rounded
                  severity="primary"
                  style={{ width: '30px', height: '30px' }}
                  onClick={() => setFilter(preFilter)}
                />
              )}
              {props.isNewCustomer && (
                <Button
                  icon="pi pi-search"
                  rounded
                  severity="primary"
                  style={{ width: '30px', height: '30px', marginLeft: '8px' }}
                  onClick={() => {
                    setTypeIsFiltering(filter.name)
                  }}
                />
              )}
              {props.isNewCustomer &&
                (filter.name !== 'Chọn ngày cụ thể' ? (
                  <Dropdown
                    value={filter}
                    options={filterChoices}
                    onChange={(e) => {
                      if (e.value.name === 'Chọn ngày cụ thể') {
                        setPreFilter(filter)
                      }
                      setFilter(e.value)
                    }}
                    optionLabel="name"
                    style={{ width: '170px', marginLeft: '8px' }}
                  />
                ) : (
                  <Calendar
                    inputId="calendar"
                    value={date}
                    onChange={(e) => setDate(e.value ?? '')}
                    style={{ width: '170px', marginLeft: '8px' }}
                    showIcon
                  ></Calendar>
                ))} */}

              <div
                className="underline cursor-pointer text-primary ml-3 cursor-pointer"
                onClick={() => setShowDetail(true)}
              >
                Chi tiết
              </div>
            </div>

            {/* <div className="text-900 font-medium text-xl">{props.firstInformation}</div> */}
          </div>
          {/* <div
            className="flex align-items-center justify-content-center bg-blue-100 border-round"
            style={{ width: '2.5rem', height: '2.5rem' }}
          >
            <i className="pi pi-shopping-cart text-blue-500 text-xl" />
          </div> */}
        </div>
        {props.secondInformation.map((item, key) => (
          <div key={key}>{item.data}</div>
        ))}
      </div>

      <Dialog
        header="Chi tiết"
        visible={showDetail}
        style={{ maxWidth: '1200px', width: '90%' }}
        modal
        onHide={() => setShowDetail(false)}
      >
        {renderDetailContent()}
      </Dialog>
    </div>
  )
}

export default InformationTemplate
