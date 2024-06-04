/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton } from 'primereact/radiobutton'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { classNames } from 'primereact/utils'

import {
  getListTTDGKK,
  deleteTTDGKK,
  updateTTDGKK,
} from 'actions/to-trinh-danh-gia-khoi-kien/to-trinh-danh-gia-khoi-kien'

import { utils as XLXSUtils, writeFile } from 'xlsx'
import * as fs from 'file-saver'
const ExcelJS = require('exceljs')
import { Workbook } from 'exceljs'

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const ToTrinhKhoiKien = (props) => {
  let emptyTTKK = {
    id: '',
    trang_thai: '',
    ngay_tao: '',
    nhan_vien_phu_trach: '',
  }

  const [ttkks, setTTKKs] = useState([])
  const [ttkkDialog, setTTKKDialog] = useState(false)
  const [deleteTTKKDialog, setDeleteTTKKDialog] = useState(false)
  const [deleteTTKKsDialog, setDeleteTTKKsDialog] = useState(false)
  const [approveTTKKDialog, setApproveTTKKDialog] = useState(false)
  const [declineTTKKDialog, setDeclineTTKKDialog] = useState(false)
  const [ttkk, setTTKK] = useState(emptyTTKK)
  const [selectedTTKKs, setSelectedTTKKs] = useState(null)
  const [ttdgkkClicked, setTtdgkkClicked] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const toast = useRef(null)
  const dt = useRef(null)

  const showAddSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Thêm tờ trình đánh giá khởi kiện thành công',
      life: 3000,
    })
  }

  useEffect(() => {
    if (localStorage.getItem('addTTDGKK') === 'success') {
      showAddSuccessfully()
      localStorage.removeItem('addTTDGKK')
    }
    getListTTDGKK(props.user.role === 'SHB' ? `ma_nhan_vien=${props.user.ma_nhan_vien}` : '').then(
      (res) => {
        if (res && res.count) {
          setTTKKs(res.results)
        }
      }
    )
  }, [])

  const openNew = () => {
    setTTKK(emptyTTKK)
    setSubmitted(false)
    setTTKKDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setTTKKDialog(false)
  }

  const hideDeleteTTDGKKDialog = () => {
    setDeleteTTKKDialog(false)
  }

  const hideDeleteProductsDialog = () => {
    setDeleteTTKKsDialog(false)
  }

  const saveProduct = () => {
    setSubmitted(true)

    if (ttkk.name.trim()) {
      let _products = [...ttkks]
      let _product = { ...ttkk }
      if (ttkk.id) {
        const index = findIndexById(ttkk.id)

        _products[index] = _product
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        })
      } else {
        _product.id = createId()
        _product.image = 'product-placeholder.svg'
        _products.push(_product)
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        })
      }

      setTTKKs(_products)
      setTTKKDialog(false)
      setTTKK(emptyTTKK)
    }
  }

  const editProduct = (product) => {
    setTTKK({ ...product })
    setTTKKDialog(true)
  }

  const confirmDeleteProduct = (rowData) => {
    setTtdgkkClicked(rowData)
    setDeleteTTKKDialog(true)
  }

  const handleDeleteTTDGKK = () => {
    deleteTTDGKK(ttdgkkClicked.ma_to_trinh).then((res) => {
      if (res && res.message === 'xoa thanh cong') {
        setDeleteTTKKDialog(false)
        const newTTDGKKs = ttkks.filter((item) => item.ma_to_trinh !== ttdgkkClicked.ma_to_trinh)
        setTTKKs([...newTTDGKKs])
        toast.current?.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Tờ trình đã được xóa',
          life: 3000,
        })
      } else {
        setDeleteTTKKDialog(false)
        toast.current?.show({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Xóa tờ trình thất bại',
          life: 3000,
        })
      }
    })
  }

  const findIndexById = (id) => {
    let index = -1
    for (let i = 0; i < ttkks?.length; i++) {
      if (ttkks[i].id === id) {
        index = i
        break
      }
    }

    return index
  }

  const createId = () => {
    let id = ''
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let numbers = '0123456789'

    // Add three uppercase letters
    for (let i = 0; i < 3; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // Add a hyphen
    id += '-'

    // Add three random numbers
    for (let i = 0; i < 3; i++) {
      id += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }

    return id
  }

  const exportCSV = () => {
    dt.current?.exportCSV()
  }

  const exportToExcel = async (fileName, sheetName, title, header, data) => {
    const titleStyle = {
      height: 40,
      font: { size: 15, bold: true, color: { argb: '000000' } },
      alignment: { horizontal: 'center', vertical: 'middle' },
    }

    const headerStyle = {
      height: 20,
      font: { size: 13, bold: true, color: { argb: '000000' } },
      alignment: { horizontal: 'center', vertical: 'middle' },
    }

    const dataStyle = {
      height: 15,
      font: { size: 12, bold: false, color: { argb: '000000' } },
    }

    const widths = [
      { width: 8 },
      { width: 15 },
      { width: 35 },
      { width: 15 },
      { width: 35 },
      { width: 15 },
    ]

    const wb = new Workbook()
    const ws = wb.addWorksheet(sheetName)
    ws.columns = widths

    const newDate = new Date()
    let dateRow = addRow(ws, [
      `Được xuất bởi: ${props.user?.ho_ten} (${props.user?.ma_nhan_vien})`,
      '',
      '',
      `Thời gian xuất: ${newDate.getHours()}:${newDate.getMinutes()} ${newDate.getDate()}/${
        newDate.getMonth() + 1
      }/${newDate.getFullYear()}`,
      '',
      '',
    ])
    mergeCells(ws, dateRow, 1, 3)
    mergeCells(ws, dateRow, 4, 6)

    let titleRow = addRow(ws, [title], titleStyle)
    mergeCells(ws, titleRow, 1, header.length)

    addRow(ws, header, headerStyle)

    data.forEach((item, index) => {
      addRow(
        ws,
        [
          index + 1,
          item.ma_to_trinh,
          `${item.khach_hang?.ho_ten} (${item.khach_hang?.ma_khach_hang})`,
          item.trang_thai,
          `${item.nhan_vien?.ho_ten} (${item.nhan_vien?.ma_nhan_vien})`,
          convertDateToString(item.created_at),
        ],
        dataStyle,
        'data'
      )
    })

    const buf = await wb.xlsx.writeBuffer()
    fs.saveAs(new Blob([buf]), `${fileName}.xlsx`)
  }

  const addRow = (ws, data, section, rowType) => {
    const borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
    const row = ws.addRow(data)

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (section?.border) {
        cell.border = borderStyle
      }
      if (section?.alignment) {
        cell.alignment = section.alignment
      }
      if (section?.font) {
        cell.font = section.font
      }
      if (section?.fill) {
        cell.fill = section.fill
      }
      if (rowType === 'data') {
        if ([1, 2, 4, 6].includes(colNumber)) {
          cell.alignment = { horizontal: 'center', vertical: 'middle' }
        }
      }
    })

    if (section?.height > 0) {
      row.height = section.height
    }

    return row
  }

  const mergeCells = (ws, row, from, to) => {
    ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`)
  }

  const confirmDeleteSelected = (rowData) => {
    setDeleteTTKKsDialog(true)
  }

  const deleteSelectedProducts = () => {
    let _products = ttkks?.filter((val) => !selectedTTKKs?.includes(val))
    setTTKKs(_products)
    setDeleteTTKKsDialog(false)
    setSelectedTTKKs(null)
    toast.current?.show({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Tờ trình đã xóa',
      life: 3000,
    })
  }

  const onCategoryChange = (e) => {
    let _product = { ...ttkk }
    _product['category'] = e.value
    setTTKK(_product)
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || ''
    let _product = { ...ttkk }
    _product[`${name}`] = val

    setTTKK(_product)
  }

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0
    let _product = { ...ttkk }
    _product[`${name}`] = val

    setTTKK(_product)
  }

  const confirmApprove = (data) => {
    setTtdgkkClicked(data)
    setApproveTTKKDialog(true)
  }

  const confirmDecline = (data) => {
    setTtdgkkClicked(data)
    setDeclineTTKKDialog(true)
  }

  const approveTTKK = () => {
    updateTTDGKK(ttdgkkClicked.ma_to_trinh, {
      action: 'approve',
    }).then((res) => {
      if (res && res.ma_to_trinh) {
        hideApproveDialog()
        getListTTDGKK(`?ma_nhan_vien=${props.user.ma_nhan_vien}`).then((res) => {
          if (res && res.count) {
            setTTKKs(res.results)
          }
        })
        toast.current?.show({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã phê duyệt tờ trình',
          life: 3000,
        })
      } else {
        hideApproveDialog()
        toast.current?.show({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Phê duyệt tờ trình thất bại',
          life: 3000,
        })
      }
    })
  }

  const declineTTKK = () => {
    updateTTDGKK(ttdgkkClicked.ma_to_trinh, {
      action: 'decline',
    }).then((res) => {
      if (res && res.ma_to_trinh) {
        hideDeclineDialog()
        getListTTDGKK(`?ma_nhan_vien=${props.user.ma_nhan_vien}`).then((res) => {
          if (res && res.count) {
            setTTKKs(res.results)
          }
        })
        toast.current?.show({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã từ chối tờ trình',
          life: 3000,
        })
      } else {
        hideApproveDialog()
        toast.current?.show({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Từ chối tờ trình thất bại',
          life: 3000,
        })
      }
    })
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          {props.user.role === 'SHB' && (
            <Link href={{ pathname: 'to-trinh-khoi-kien/chi-tiet', query: { createNew: true } }}>
              <Button label="Thêm" icon="pi pi-plus" severity="success" className="mr-2" />
            </Link>
          )}
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    const headers = [
      'STT',
      'Mã tờ trình',
      'Khách hàng',
      'Trạng thái',
      'Người tạo tờ trình',
      'Ngày tạo',
    ]
    return (
      <React.Fragment>
        <Button
          label="Xuất excel"
          icon="pi pi-upload"
          severity="help"
          onClick={() =>
            exportToExcel(
              'TTMG_Report',
              'TTMG_Report',
              'Danh sách tờ trình đánh giá khởi kiện',
              headers,
              ttkks
            )
          }
        />
      </React.Fragment>
    )
  }

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Trạng thái</span>
        <span className={`product-badge status-${rowData.trang_thai?.toLowerCase()}`}>
          {rowData.trang_thai}
        </span>
      </>
    )
  }

  const convertDateToString = (createdDate) => {
    if (!createdDate) return ''
    const tempDate = new Date(createdDate)
    const date = tempDate.getDate() < 10 ? `0${tempDate.getDate()}` : tempDate.getDate()
    const month =
      tempDate.getMonth() + 1 < 10 ? `0${tempDate.getMonth() + 1}` : tempDate.getMonth() + 1
    const year = tempDate.getFullYear()
    return `${date}/${month}/${year}`
  }

  const dateBodyTemplate = (rowData) => {
    const tempDate = new Date(rowData.created_at)
    const date = tempDate.getDate() < 10 ? `0${tempDate.getDate()}` : tempDate.getDate()
    const month =
      tempDate.getMonth() + 1 < 10 ? `0${tempDate.getMonth() + 1}` : tempDate.getMonth() + 1
    const year = tempDate.getFullYear()
    return (
      <>
        <span className="p-column-title">Ngày tạo</span>
        {date}/{month}/{year}
      </>
    )
  }

  const renderCustomer = (rowData) => {
    return (
      <div>
        {rowData.khach_hang?.ho_ten} ({rowData.khach_hang?.ma_khach_hang})
      </div>
    )
  }

  const staffBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Nhân viên phụ trách</span>
        {rowData.nhan_vien?.ho_ten} ({rowData.nhan_vien?.ma_nhan_vien})
      </>
    )
  }

  const actionBodyTemplate = (rowData) => {
    if (props.user.role === 'SHB' || props.user.role === 'NDH') {
      return rowData.trang_thai.toLowerCase() === 'chưa duyệt' ? (
        <>
          <Link
            href={{
              pathname: 'to-trinh-khoi-kien/chi-tiet',
              query: { ma_to_trinh: rowData.ma_to_trinh },
            }}
          >
            <Button
              icon={props.user.role === 'NDH' ? 'pi pi-search' : 'pi pi-pencil'}
              rounded
              severity="success"
              className="mr-2"
            />
          </Link>

          {rowData.trang_thai.toLowerCase() === 'chưa duyệt' && (
            <Button
              icon="pi pi-trash"
              rounded
              severity="warning"
              onClick={() => confirmDeleteProduct(rowData)}
            />
          )}
        </>
      ) : (
        <>
          <Link
            href={{
              pathname: 'to-trinh-khoi-kien/chi-tiet',
              query: { ma_to_trinh: rowData.ma_to_trinh },
            }}
          >
            <Button icon={'pi pi-search'} rounded severity="success" className="mr-2" />
          </Link>
        </>
      )
    } else if (props.user.role === 'NPD') {
      return rowData.trang_thai.toLowerCase() === 'chưa duyệt' ? (
        <>
          <Link
            href={{
              pathname: 'to-trinh-khoi-kien/chi-tiet',
              query: { ma_to_trinh: rowData.ma_to_trinh },
            }}
          >
            <Button
              icon={props.user.role === 'NPD' ? 'pi pi-search' : 'pi pi-pencil'}
              rounded
              severity="success"
              className="mr-2"
            />
          </Link>

          <Button
            icon="pi pi-check"
            rounded
            severity="primary"
            onClick={() => confirmApprove(rowData)}
            className="mr-2"
          />

          <Button
            icon="pi pi-times"
            rounded
            severity="warning"
            onClick={() => confirmDecline(rowData)}
          />
        </>
      ) : (
        <>
          <Link
            href={{
              pathname: 'to-trinh-khoi-kien/chi-tiet',
              query: { ma_to_trinh: rowData.ma_to_trinh },
            }}
          >
            <Button
              icon={props.user.role === 'NPD' ? 'pi pi-search' : 'pi pi-pencil'}
              rounded
              severity="success"
              className="mr-2"
            />
          </Link>
        </>
      )
    }
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Tờ trình đánh giá khởi kiện</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  )

  const hideApproveDialog = () => {
    setApproveTTKKDialog(false)
  }

  const hideDeclineDialog = () => {
    setDeclineTTKKDialog(false)
  }

  const productDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Lưu" icon="pi pi-check" text onClick={saveProduct} />
    </>
  )
  const deleteTTDGKKDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDeleteTTDGKKDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={handleDeleteTTDGKK} />
    </>
  )
  const deleteProductsDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={deleteSelectedProducts} />
    </>
  )

  const approveProductDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideApproveDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={approveTTKK} />
    </>
  )

  const declineProductDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDeclineDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={declineTTKK} />
    </>
  )

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={ttkks}
            selection={selectedTTKKs}
            onSelectionChange={(e) => setSelectedTTKKs(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Hiển thị từ {first} đến {last} trong {totalRecords} tờ trình"
            globalFilter={globalFilter}
            emptyMessage="Không tìm thấy."
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              field="ma_to_trinh"
              header="Mã tờ trình"
              sortable
              headerStyle={{ minWidth: '9rem' }}
            ></Column>
            <Column
              field="id"
              header="Khách hàng"
              sortable
              body={renderCustomer}
              headerStyle={{ minWidth: '15rem' }}
            ></Column>
            <Column
              field="trang_thai"
              header="Trạng thái"
              sortable
              body={statusBodyTemplate}
              headerStyle={{ minWidth: '9rem' }}
            ></Column>
            <Column
              field="nhan_vien_phu_trach"
              header="Nhân viên phụ trách"
              body={staffBodyTemplate}
              sortable
              headerStyle={{ minWidth: '15rem' }}
            ></Column>
            <Column
              field="ngay_tao"
              header="Ngày tạo"
              sortable
              body={dateBodyTemplate}
              headerStyle={{ minWidth: '10rem' }}
            ></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '12rem' }}></Column>
          </DataTable>

          <Dialog
            visible={ttkkDialog}
            style={{ width: '450px' }}
            header="Product Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            {ttkk.image && (
              <img
                src={`/demo/images/product/${ttkk.image}`}
                alt={ttkk.image}
                width="150"
                className="mt-0 mx-auto mb-5 block shadow-2"
              />
            )}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={ttkk.name}
                onChange={(e) => onInputChange(e, 'name')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !ttkk.name,
                })}
              />
              {submitted && !ttkk.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={ttkk.description}
                onChange={(e) => onInputChange(e, 'description')}
                required
                rows={3}
                cols={20}
              />
            </div>

            <div className="field">
              <label className="mb-3">Category</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category1"
                    name="category"
                    value="Accessories"
                    onChange={onCategoryChange}
                    checked={ttkk.category === 'Accessories'}
                  />
                  <label htmlFor="category1">Accessories</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category2"
                    name="category"
                    value="Clothing"
                    onChange={onCategoryChange}
                    checked={ttkk.category === 'Clothing'}
                  />
                  <label htmlFor="category2">Clothing</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category3"
                    name="category"
                    value="Electronics"
                    onChange={onCategoryChange}
                    checked={ttkk.category === 'Electronics'}
                  />
                  <label htmlFor="category3">Electronics</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category4"
                    name="category"
                    value="Fitness"
                    onChange={onCategoryChange}
                    checked={ttkk.category === 'Fitness'}
                  />
                  <label htmlFor="category4">Fitness</label>
                </div>
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Price</label>
                <InputNumber
                  id="price"
                  value={ttkk.price}
                  onValueChange={(e) => onInputNumberChange(e, 'price')}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity">Quantity</label>
                <InputNumber
                  id="quantity"
                  value={ttkk.quantity}
                  onValueChange={(e) => onInputNumberChange(e, 'quantity')}
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={deleteTTKKDialog}
            style={{ width: '450px' }}
            header="Xác nhận"
            modal
            footer={deleteTTDGKKDialogFooter}
            onHide={hideDeleteTTDGKKDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {ttkk && (
                <span>
                  Bạn có chắc chắn muốn xóa tờ trình <b>{ttdgkkClicked.ma_to_trinh} </b>không?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteTTKKsDialog}
            style={{ width: '450px' }}
            header="Xác nhận"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {ttkk && <span>Bạn có chắc chắn muốn xóa những tờ trình đã chọn không?</span>}
            </div>
          </Dialog>

          <Dialog
            visible={approveTTKKDialog}
            style={{ width: '450px' }}
            header="Xác nhận"
            modal
            footer={approveProductDialogFooter}
            onHide={hideApproveDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {ttkk && (
                <span>
                  Bạn có chắc chắn muốn phê duyệt tờ trình <b>{ttdgkkClicked.ma_to_trinh} </b>không?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={declineTTKKDialog}
            style={{ width: '450px' }}
            header="Xác nhận"
            modal
            footer={declineProductDialogFooter}
            onHide={hideDeclineDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {ttkk && (
                <span>
                  Bạn có chắc chắn muốn từ chối tờ trình <b>{ttdgkkClicked.ma_to_trinh} </b>không?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(ToTrinhKhoiKien)
