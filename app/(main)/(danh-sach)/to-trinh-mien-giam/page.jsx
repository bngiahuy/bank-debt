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

import { getListTTMG, deleteTTMG, updateTTMG } from 'actions/to-trinh-mien-giam/to-trinh-mien-giam'

const ToTrinhMienGiam = (props) => {
  let emptyForm = {
    id: '',
    trang_thai: '',
    ngay_tao: '',
    nhan_vien_phu_trach: '',
  }

  const [data, setData] = useState([])
  const [ttmgClicked, setTtmgClicked] = useState({})
  const [ttkkDialog, setTTKKDialog] = useState(false)
  const [deleteTTKKDialog, setDeleteTTKKDialog] = useState(false)
  const [approveTTMGDialog, setApproveTTMGDialog] = useState(false)
  const [declineTTMGDialog, setDeclineTTMGDialog] = useState(false)
  const [deleteTTKKsDialog, setDeleteTTKKsDialog] = useState(false)
  const [ttkk, setTTKK] = useState(emptyForm)
  const [selectedTTKKs, setSelectedTTKKs] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const toast = useRef(null)
  const dt = useRef(null)

  const showAddSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Thêm tờ trình miễn giảm thành công',
      life: 3000,
    })
  }

  const getTTMGs = () => {
    getListTTMG(props.user.role === 'SHB' ? `ma_nhan_vien=${props.user.ma_nhan_vien}` : '').then(
      (res) => {
        if (res && res.count) {
          setData(res.results)
        }
      }
    )
  }

  useEffect(() => {
    if (localStorage.getItem('addTTMG') === 'success') {
      showAddSuccessfully()
      localStorage.removeItem('addTTMG')
    }
    getTTMGs()
  }, [])

  const openNew = () => {
    setTTKK(emptyForm)
    setSubmitted(false)
    setTTKKDialog(true)
  }

  const hideDialog = () => {
    setSubmitted(false)
    setTTKKDialog(false)
  }

  const hideDeleteProductDialog = () => {
    setDeleteTTKKDialog(false)
  }

  const hideApproveDialog = () => {
    setApproveTTMGDialog(false)
  }

  const hideDeclineDialog = () => {
    setDeclineTTMGDialog(false)
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
      setTTKK(emptyForm)
    }
  }

  const confirmDeleteProduct = (data) => {
    setTtmgClicked(data)
    setDeleteTTKKDialog(true)
  }

  const confirmApprove = (data) => {
    setTtmgClicked(data)
    setApproveTTMGDialog(true)
  }

  const confirmDecline = (data) => {
    setTtmgClicked(data)
    setDeclineTTMGDialog(true)
  }

  const approveTTMG = () => {
    updateTTMG(ttmgClicked.ma_to_trinh, {
      action: 'approve',
    }).then((res) => {
      if (res && res.ma_to_trinh) {
        hideApproveDialog()
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

  const declineTTMG = () => {
    updateTTMG(ttmgClicked.ma_to_trinh, {
      action: 'decline',
    }).then((res) => {
      if (res && res.ma_to_trinh) {
        hideDeclineDialog()
        toast.current?.show({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đã từ chối tờ trình',
          life: 3000,
        })
      } else {
        hideDeclineDialog()
        toast.current?.show({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Từ chối tờ trình thất bại',
          life: 3000,
        })
      }
    })
  }

  const deleteProduct = () => {
    deleteTTMG(ttmgClicked.ma_to_trinh).then((res) => {
      if (res && res.message === 'xoa thanh cong') {
        setDeleteTTKKDialog(false)
        if (data.length === 1) {
          setData([])
        } else {
          getTTMGs()
        }
        setTtmgClicked({})
        toast.current?.show({
          severity: 'success',
          summary: 'Thành công',
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

  const confirmDeleteSelected = () => {
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

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          {props.user.role === 'SHB' && (
            <Link href={{ pathname: 'to-trinh-mien-giam/chi-tiet', query: { createNew: true } }}>
              <Button label="Thêm" icon="pi pi-plus" severity="success" className="mr-2" />
            </Link>
          )}
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Xuất CSV" icon="pi pi-upload" severity="help" onClick={exportCSV} />
      </React.Fragment>
    )
  }

  const codeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Mã tờ trình</span>
        {rowData.ma_to_trinh}
      </>
    )
  }

  const customerBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Khách hàng</span>
        {rowData.khach_hang.ho_ten} ({rowData.khach_hang.ma_khach_hang})
      </>
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

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.created_at)
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    return (
      <>
        <span className="p-column-title">Ngày tạo</span>
        {`${day}/${month}/${year}`}
      </>
    )
  }

  const staffBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Nhân viên phụ trách</span>
        {rowData.nhan_vien.ho_ten} ({rowData.nhan_vien.ma_nhan_vien})
      </>
    )
  }

  const actionBodyTemplate = (rowData) => {
    if (props.user.role === 'SHB' || props.user.role === 'NDH') {
      return rowData.trang_thai.toLowerCase() === 'chưa duyệt' ? (
        <>
          <Link
            href={{
              pathname: 'to-trinh-mien-giam/chi-tiet',
              query: { ma_to_trinh: rowData.ma_to_trinh },
            }}
          >
            <Button
              icon={props.user.role === 'SHB' ? 'pi pi-pencil' : 'pi pi-search'}
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
              pathname: 'to-trinh-mien-giam/chi-tiet',
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
              pathname: 'to-trinh-mien-giam/chi-tiet',
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
              pathname: 'to-trinh-mien-giam/chi-tiet',
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
      <h5 className="m-0">Tờ trình miễn giảm</h5>
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

  const productDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Lưu" icon="pi pi-check" text onClick={saveProduct} />
    </>
  )

  const deleteProductDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={deleteProduct} />
    </>
  )

  const approveProductDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideApproveDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={approveTTMG} />
    </>
  )

  const declineProductDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDeclineDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={declineTTMG} />
    </>
  )

  const deleteProductsDialogFooter = (
    <>
      <Button label="Hủy" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
      <Button label="Có" icon="pi pi-check" text onClick={deleteSelectedProducts} />
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
            value={data}
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
            emptyMessage="Không tìm thấy tờ trình miễn giảm nào"
            header={header}
            responsiveLayout="scroll"
          >
            <Column
              header="Mã tờ trình"
              sortable
              body={codeBodyTemplate}
              headerStyle={{ minWidth: '9rem' }}
            ></Column>
            <Column
              header="Khách hàng"
              sortable
              body={customerBodyTemplate}
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
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {ttkk && (
                <span>
                  Bạn có chắc chắn muốn xóa tờ trình <b>{ttmgClicked.ma_to_trinh} </b>không?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={approveTTMGDialog}
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
                  Bạn có chắc chắn muốn phê duyệt tờ trình <b>{ttmgClicked.ma_to_trinh} </b>không?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={declineTTMGDialog}
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
                  Bạn có chắc chắn muốn từ chối tờ trình <b>{ttmgClicked.ma_to_trinh} </b>không?
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

export default connect(mapStateToProps)(ToTrinhMienGiam)
