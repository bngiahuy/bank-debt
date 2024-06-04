'use client'
import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { TreeTable } from 'primereact/treetable'
import { Dropdown } from 'primereact/dropdown'

import {
  addActionCategory,
  getListActionCategories,
  updateActionCategory,
  deleteActionCategory,
} from 'actions/danh-muc-hanh-dong/danh-muc-hanh-dong'
import {
  addActionCategoryResult,
  getListActionCategoryResults,
  updateActionCategoryResult,
  deleteActionCategoryResult,
} from 'actions/danh-muc-ket-qua-hanh-dong/danh-muc-ket-qua-hanh-dong'

const types = [
  {
    name: 'Tên hành động',
  },
  {
    name: 'Kết quả hành động',
  },
]

const actionTypes = [
  {
    name: 'Liên hệ khách hàng',
  },
  {
    name: 'Gửi thư khách hàng',
  },
  {
    name: 'Liên hệ người thân khách hàng',
  },
  {
    name: 'Xác minh khách hàng',
  },
  {
    name: 'Khởi kiện và thi hành án',
  },
  {
    name: 'Thông tin khác',
  },
]

const DanhMucHanhDongThuHoiNo = (props) => {
  const [actionsList, setActionsList] = useState([])
  const [actionResultList, setActionResultList] = useState([])
  const [data, setData] = useState([])
  const [selectedFileKeys, setSelectedFileKeys] = useState(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [form, setForm] = useState({})
  const [updateForm, setUpdateForm] = useState({})
  const [deleteForm, setDeleteForm] = useState({})
  const [type, setType] = useState({})
  const [actionType, setActionType] = useState({})
  const [actionName, setActionName] = useState({})
  const [actionId, setActionId] = useState('')
  const [errors, setErrors] = useState({})
  const [updateErrors, setUpdateErrors] = useState({})
  const [actionIsUpdating, setActionIsUpdating] = useState({})
  const [actionIsDeleting, setActionIsDeleting] = useState({})
  const [displayConfirmation, setDisplayConfirmation] = useState(false)
  const toast = useRef(null)

  useEffect(() => {
    getAllAndConvert()
  }, [])

  const getAllAndConvert = () => {
    getListActionCategories().then((res) => {
      if (res && res.count) {
        setActionsList(res.results)
        getListActionCategoryResults().then((res2) => {
          if (res2 && res2.count) {
            setActionResultList(res2.results)
            setData(convert(res.results, res2.results))
          }
        })
      }
    })
  }

  const convert = (actionsList, resultsList) => {
    const newData = [
      {
        key: '0',
        data: {
          name: 'Liên hệ khách hàng',
          type: 'Loại hành động',
        },
        children: [],
      },
      {
        key: '1',
        data: {
          name: 'Gửi thư khách hàng',
          type: 'Loại hành động',
        },
        children: [],
      },
      {
        key: '2',
        data: {
          name: 'Liên hệ người thân khách hàng',
          type: 'Loại hành động',
        },
        children: [],
      },
      {
        key: '3',
        data: {
          name: 'Xác minh khách hàng',
          type: 'Loại hành động',
        },
        children: [],
      },
      {
        key: '4',
        data: {
          name: 'Khởi kiện và thi hành án',
          type: 'Loại hành động',
        },
        children: [],
      },
      {
        key: '5',
        data: {
          name: 'Thông tin khác',
          type: 'Loại hành động',
        },
        children: [],
      },
    ]
    newData.forEach((item, itemKey) => {
      actionsList.forEach((action, actionKey) => {
        // forEach function elow is used to add all ten_hanh_dong into loai_hanh_dong
        if (action.loai_hanh_dong.toLowerCase() === item.data.name.toLowerCase()) {
          let newActionName = {
            key: `${item.key}-${newData[itemKey].children.length}`,
            data: {
              name: action.ten_hanh_dong,
              type: 'Tên hành động',
              id: action.ma_hanh_dong,
              thu_tu_hanh_dong: action.thu_tu_hanh_dong,
              thu_tu_uu_tien: action.thu_tu_uu_tien,
              ty_trong: action.ty_trong,
            },
            children: [],
          }
          // This forEach is to add action results into ten_hanh_dong before adding ten_hanh_dong into loai_hanh_dong
          resultsList.forEach((result, resultKey) => {
            if (result.ma_hanh_dong === action.ma_hanh_dong) {
              newActionName.children.push({
                key: `${newActionName.key}-${newActionName.children.length}`,
                data: {
                  name: result.ghi_chu_ket_qua,
                  type: 'Kết quả hành động',
                  id: result.ma_ket_qua,
                },
              })
            }
          })
          // now we add ten_hanh_dong into loai_hanh_dong
          newData[itemKey].children.push(newActionName)
        }
      })
    })
    return newData
  }

  const renderActionTypeInputs = () => {
    return (
      <div className="field">
        <label htmlFor="HoTen">
          Loại hành động <span style={{ color: 'red' }}>*</span>
        </label>
        <Dropdown
          value={actionType}
          onChange={(e) => {
            setActionType(e.value)
            setForm({ ...form, loai_hanh_dong: e.value.name })
            setErrors({ ...errors, actionTypeError: false, actionIdError: false })
          }}
          options={actionTypes}
          optionLabel="name"
          placeholder="Chọn loại hành động"
          className={errors.actionTypeError ? 'p-invalid' : ''}
        />
      </div>
    )
  }

  const renderActionIdInputs = () => {
    return (
      <div className="field">
        <label htmlFor="HoTen">
          Mã hành động <span style={{ color: 'red' }}>*</span>
        </label>
        <InputText
          value={actionId}
          onChange={(e) => {
            setActionId(e.target.value)
            setForm({ ...form, ma_hanh_dong: e.target.value })
            setErrors({ ...errors, actionIdError: false })
          }}
          className={errors.actionIdError ? 'p-invalid' : ''}
        />
      </div>
    )
  }

  const renderActionNameInputs = () => {
    return type.name === 'Tên hành động' ? (
      <>
        {renderActionTypeInputs()}
        {actionType.name && renderActionIdInputs()}
        <div className="field">
          <label htmlFor="HoTen">
            Tên hành động <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            value={form.ten_hanh_dong}
            onChange={(e) => {
              setForm({ ...form, ten_hanh_dong: e.target.value })
              setErrors({ ...errors, actionNameError: false })
            }}
            className={errors.actionNameError ? 'p-invalid' : ''}
          />
        </div>
        {renderOtherInputs()}
      </>
    ) : (
      <>
        {renderActionTypeInputs()}
        <div className="field">
          <label htmlFor="HoTen">
            Tên hành động <span style={{ color: 'red' }}>*</span>
          </label>
          <Dropdown
            value={actionName}
            onChange={(e) => {
              setActionName(e.value)
              setForm({ ...form, ten_hanh_dong: e.value.name })
              setErrors({ ...errors, actionNameError: false })
            }}
            options={getActionNamesForAddResult()}
            optionLabel="name"
            placeholder="Chọn tên hành động"
            className={errors.actionNameError ? 'p-invalid' : ''}
          />
        </div>
      </>
    )
  }

  const renderActionResultInputs = () => {
    return (
      <>
        {renderActionNameInputs()}

        <div className="field">
          <label htmlFor="HoTen">
            Mã kết quả <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            value={form.ma_ket_qua}
            onChange={(e) => {
              setForm({ ...form, ma_ket_qua: e.target.value })
              setErrors({ ...errors, actionResultIdError: false })
            }}
            className={errors.actionResultIdError ? 'p-invalid' : ''}
          />
        </div>

        <div className="field">
          <label htmlFor="HoTen">
            Kết quả hành động <span style={{ color: 'red' }}>*</span>
          </label>
          <InputText
            value={form.ghi_chu_ket_qua}
            onChange={(e) => {
              setForm({ ...form, ghi_chu_ket_qua: e.target.value })
              setErrors({ ...errors, actionResultError: false })
            }}
            className={errors.actionResultError ? 'p-invalid' : ''}
          />
        </div>
      </>
    )
  }

  const renderOtherInputs = () => {
    return (
      <>
        <div className="field">
          <label htmlFor="HoTen">Thứ tự hành động</label>
          <InputText
            value={form.thu_tu_hanh_dong}
            onChange={(e) => {
              setForm({ ...form, thu_tu_hanh_dong: e.target.value, thu_tu_uu_tien: e.target.value })
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="HoTen">Thứ tự ưu tiên</label>
          <InputText value={form.thu_tu_uu_tien} disabled />
        </div>

        <div className="field">
          <label htmlFor="HoTen">Tỷ trọng (%)</label>
          <InputText
            value={form.ty_trong}
            onChange={(e) => {
              setForm({ ...form, ty_trong: e.target.value })
            }}
          />
        </div>
      </>
    )
  }

  const renderAddContent = () => {
    return (
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="HoTen">
            Loại <span style={{ color: 'red' }}>*</span>
          </label>
          <Dropdown
            value={type}
            onChange={(e) => {
              setType(e.value)
              setErrors({})
              setForm({})
              setActionName({})
              setActionType({})
            }}
            options={types}
            optionLabel="name"
            placeholder="Chọn loại cần thêm"
            className={errors.typeError ? 'p-invalid' : ''}
          />
        </div>
        {type.name === 'Tên hành động' && renderActionNameInputs()}
        {type.name === 'Kết quả hành động' && renderActionResultInputs()}
        <div className="flex justify-content-center mt-5">
          <Button
            label="Hủy"
            severity="primary"
            outlined
            style={{ width: '80px', height: '36px' }}
            onClick={() => onCancelAddDialog()}
          />
          <Button
            label="Thêm"
            style={{ width: '80px', height: '36px', marginLeft: '16px' }}
            onClick={() => handleAdd()}
          />
        </div>
      </div>
    )
  }

  const renderUpdateContent = () => {
    return (
      <div className="p-fluid">
        {actionIsUpdating.key?.length === 5 ? (
          <>
            <div className="field">
              <label htmlFor="HoTen">
                Mã kết quả <span style={{ color: 'red' }}>*</span> {/*New Mã kết quả (ma_ket_qua)*/}
              </label>
              <InputText
                value={updateForm.ma_ket_qua}
                onChange={(e) => {
                  setUpdateForm({ ...updateForm, ma_ket_qua: e.target.value })
                  setUpdateErrors({ ...updateErrors, actionResultIdError: false })
                }}
                className={updateErrors.actionResultIdError ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="HoTen">
                Kết quả hành động <span style={{ color: 'red' }}>*</span>
              </label>
              <InputText
                value={updateForm.ghi_chu_ket_qua}
                onChange={(e) => {
                  setUpdateForm({ ...updateForm, ghi_chu_ket_qua: e.target.value })
                  setUpdateErrors({ ...updateErrors, actionResultError: false })
                }}
                className={updateErrors.actionResultError ? 'p-invalid' : ''}
              />
            </div>
          </>
        ) : (
          <>
            <div className="field">
              <div className="field">
                <label htmlFor="HoTen">
                  Mã hành động <span style={{ color: 'red' }}>*</span>{' '}
                  {/*New Mã hành động (ma_hanh_dong)*/}
                </label>
                <InputText
                  value={updateForm.ma_hanh_dong}
                  onChange={(e) => {
                    setUpdateForm({ ...updateForm, ma_hanh_dong: e.target.value })
                    setUpdateErrors({ ...updateErrors, actionIdError: false })
                  }}
                  className={updateErrors.actionIdError ? 'p-invalid' : ''}
                />
              </div>

              <label htmlFor="HoTen">
                Tên hành động <span style={{ color: 'red' }}>*</span>
              </label>
              <InputText
                value={updateForm.ten_hanh_dong}
                onChange={(e) => {
                  setUpdateForm({ ...updateForm, ten_hanh_dong: e.target.value })
                  setUpdateErrors({ ...updateErrors, actionNameError: false })
                }}
                className={updateErrors.actionNameError ? 'p-invalid' : ''}
              />
            </div>

            <div className="field">
              <label htmlFor="HoTen">Thứ tự hành động</label>
              <InputText
                value={updateForm.thu_tu_hanh_dong}
                onChange={(e) => {
                  setUpdateForm({
                    ...updateForm,
                    thu_tu_hanh_dong: e.target.value,
                    thu_tu_uu_tien: e.target.value,
                  })
                }}
              />
            </div>

            <div className="field">
              <label htmlFor="HoTen">Thứ tự ưu tiên</label>
              <InputText value={updateForm.thu_tu_uu_tien} disabled />
            </div>

            <div className="field">
              <label htmlFor="HoTen">Tỷ trọng (%)</label>
              <InputText
                value={updateForm.ty_trong}
                onChange={(e) => {
                  setUpdateForm({ ...updateForm, ty_trong: e.target.value })
                }}
              />
            </div>
          </>
        )}
        <div className="flex justify-content-center mt-5">
          <Button
            label="Hủy"
            severity="primary"
            outlined
            style={{ width: '80px', height: '36px' }}
            onClick={() => onCancelUpdateDialog()}
          />
          <Button
            label="Cập nhật"
            style={{ width: '96px', height: '36px', marginLeft: '16px' }}
            onClick={() => handleUpdate()}
          />
        </div>
      </div>
    )
  }

  const confirmationDialogFooter = (
    <>
      <Button
        type="button"
        label="Hủy"
        icon="pi pi-times"
        onClick={() => setShowDeleteDialog(false)}
        text
      />
      <Button
        type="button"
        label="Xóa"
        icon="pi pi-check"
        onClick={() => handleDelete(false)}
        text
        autoFocus
      />
    </>
  )

  const onCancelAddDialog = () => {
    setShowAddDialog(false)
    setType({})
    setForm({})
    setActionName({})
    setActionType({})
    setErrors({})
  }

  const onCancelUpdateDialog = () => {
    setShowUpdateDialog(false)
    setUpdateErrors({})
  }

  const preCheck = () => {
    let noError = true
    const tempError = {}
    if (!type.name) {
      noError = false
      tempError.typeError = true
    }
    if (type.name === 'Tên hành động') {
      if (!actionType.name) {
        noError = false
        tempError.actionTypeError = true
      }
      if (!actionId) {
        noError = false
        tempError.actionIdError = true
      }
      if (!form.ten_hanh_dong) {
        noError = false
        tempError.actionNameError = true
      }
    }
    if (type.name === 'Kết quả hành động') {
      if (!actionType.name) {
        noError = false
        tempError.actionTypeError = true
      }
      if (!actionName.name) {
        noError = false
        tempError.actionNameError = true
      }
      if (!form.ma_ket_qua) {
        noError = false
        tempError.actionResultIdError = true
      }
      if (!form.ghi_chu_ket_qua) {
        noError = false
        tempError.actionResultError = true
      }
    }
    setErrors(tempError)
    return noError
  }

  const preCheckOfUpdating = () => {
    let noError = true
    const tempError = {}
    if (actionIsUpdating.key?.length === 3) {
      if (!updateForm.ma_hanh_dong) {
        noError = false
        tempError.actionIdError = true
      }
      if (!updateForm.ten_hanh_dong) {
        noError = false
        tempError.actionNameError = true
      }
    } else {
      if (!updateForm.ma_ket_qua) {
        noError = false
        tempError.actionResultIdError = true
      }
      if (!updateForm.ghi_chu_ket_qua) {
        noError = false
        tempError.actionResultError = true
      }
    }
    setUpdateErrors(tempError)
    return noError
  }

  const handleAdd = () => {
    if (preCheck()) {
      if (type.name === 'Tên hành động') {
        addActionCategory(form).then((res) => {
          if (res && res.ma_hanh_dong) {
            onCancelAddDialog()
            informAddSuccessfully()
            getAllAndConvert()
          } else {
            onCancelAddDialog()
            informAddFailed()
          }
        })
      }
      if (type.name === 'Kết quả hành động') {
        const dataToSend = {
          ma_ket_qua: form.ma_ket_qua,
          ghi_chu_ket_qua: form.ghi_chu_ket_qua,
          ma_hanh_dong: actionName.id,
        }
        addActionCategoryResult(dataToSend).then((res) => {
          if (res && res.ma_ket_qua) {
            onCancelAddDialog()
            informAddSuccessfully()
            getAllAndConvert()
          }
        })
      }
    }
  }

  const handleUpdate = () => {
    if (preCheckOfUpdating()) {
      if (actionIsUpdating.key?.length === 5) {
        updateActionCategoryResult(actionIsUpdating.data?.id, updateForm).then((res) => {
          if (res && res.ma_ket_qua) {
            onCancelUpdateDialog()
            getAllAndConvert()
            informUpdateSuccessfully()
          }
        })
      } else {
        updateActionCategory(actionIsUpdating.data?.id, updateForm).then((res) => {
          if (res && res.ma_hanh_dong) {
            onCancelUpdateDialog()
            getAllAndConvert()
            informUpdateSuccessfully()
          }
        })
      }
    }
  }

  const handleDelete = () => {
    if (actionIsDeleting.key?.length === 3) {
      deleteActionCategory(actionIsDeleting.data?.id).then((res) => {
        if (res && res.message === 'xoa thanh cong') {
          setShowDeleteDialog(false)
          getAllAndConvert()
          informDeleteSuccessfully()
        } else {
          setShowDeleteDialog(false)
          getAllAndConvert()
          informDeleteFailed()
        }
      })
    } else {
      deleteActionCategoryResult(actionIsDeleting.data?.id).then((res) => {
        if (res && res.message === 'xoa thanh cong') {
          setShowDeleteDialog(false)
          getAllAndConvert()
          informDeleteSuccessfully()
        } else {
          setShowDeleteDialog(false)
          getAllAndConvert()
          informDeleteFailed()
        }
      })
    }
  }

  const informAddSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Thêm thành công',
      life: 3000,
    })
  }

  const informDeleteSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Xóa thành công',
      life: 3000,
    })
  }

  const informDeleteFailed = () => {
    toast.current?.show({
      severity: 'error',
      detail: 'Xóa thất bại',
      life: 3000,
    })
  }

  const informAddFailed = () => {
    toast.current?.show({
      severity: 'error',
      detail: 'Thêm thất bại',
      life: 3000,
    })
  }

  const informUpdateSuccessfully = () => {
    toast.current?.show({
      severity: 'success',
      detail: 'Cập nhật thành công',
      life: 3000,
    })
  }

  const getActionNamesForAddResult = () => {
    if (!actionType.name) return []
    const getActionNamesOfType = actionsList.filter(
      (item) => item.loai_hanh_dong?.toLowerCase() === actionType.name?.toLowerCase()
    )
    return getActionNamesOfType.map((item, key) => {
      return {
        name: item.ten_hanh_dong,
        id: item.ma_hanh_dong,
      }
    })
  }

  const renderColumnAction = (rowData) => {
    if (rowData.key.length !== 1)
      return (
        <div>
          <Button
            icon="pi pi-pencil"
            rounded
            severity="success"
            className="mr-2"
            onClick={() => {
              setActionIsUpdating(rowData)
              if (rowData.key?.length === 3) {
                setUpdateForm({
                  ma_hanh_dong: rowData.data?.id,
                  ten_hanh_dong: rowData.data?.name,
                  thu_tu_hanh_dong: rowData.data?.thu_tu_hanh_dong,
                  thu_tu_uu_tien: rowData.data?.thu_tu_uu_tien,
                  ty_trong: rowData.data?.ty_trong,
                })
              } else {
                setUpdateForm({
                  ma_ket_qua: rowData.data?.id,
                  ghi_chu_ket_qua: rowData.data?.name,
                })
              }
              setShowUpdateDialog(true)
            }}
          />
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => {
              setActionIsDeleting(rowData)
              if (rowData.key?.length === 3) {
                setDeleteForm({
                  ma_hanh_dong: rowData.data?.id,
                })
              } else {
                setDeleteForm({
                  ma_ket_qua: rowData.data?.id,
                })
              }
              setShowDeleteDialog(true)
            }}
          />
        </div>
      )
  }

  const haveNoCheckboxSelected = () => {
    let noCheckboxSelected = false
    if (!selectedFileKeys) return true
    if (Object.keys(selectedFileKeys).length === 0) return true
    Object.keys(selectedFileKeys).forEach((item, key) => {
      if (item.length === 1) {
        if (!selectedFileKeys[item]?.checked && !selectedFileKeys[item]?.partialChecked)
          noCheckboxSelected = true
      }
    })
    return noCheckboxSelected
  }

  return (
    <div className="card" style={{ minHeight: '100vh' }}>
      <div>
        <div className="flex justify-content-between mb-3">
          <div className="font-bold text-xl">Danh mục hành động thu hồi nợ</div>
          <div>
            {!haveNoCheckboxSelected() && (
              <Button
                label="Xóa"
                style={{ width: '80px', height: '36px', marginLeft: '16px' }}
                //onClick={() => handleAdd()}
                severity="danger"
                outlined
              />
            )}
            {props.user.role === 'NDH' && (
              <Button
                label="Thêm"
                style={{ width: '80px', height: '36px', marginLeft: '16px' }}
                onClick={() => setShowAddDialog(true)}
              />
            )}
          </div>
        </div>
        <Toast ref={toast} />
        {/* Add debt recovery action dialog */}
        <Dialog
          header="Thêm"
          visible={showAddDialog}
          style={{ maxWidth: '400px', width: '90%' }}
          modal
          onHide={() => onCancelAddDialog()}
        >
          {renderAddContent()}
        </Dialog>
        {/* Update debt recovery action dialog */}
        <Dialog
          header="Chỉnh sửa"
          visible={showUpdateDialog}
          style={{ maxWidth: '400px', width: '90%' }}
          modal
          onHide={() => onCancelUpdateDialog()}
        >
          {renderUpdateContent()}
        </Dialog>
        <Dialog
          header="Xác nhận"
          visible={showDeleteDialog}
          onHide={() => setShowDeleteDialog(false)}
          style={{ width: '350px' }}
          modal
          footer={confirmationDialogFooter}
        >
          <div className="flex align-items-center justify-content-center">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            <span>Bạn có chắc chắn muốn xóa không?</span>
          </div>
        </Dialog>
        <div>
          <TreeTable
            value={data}
            selectionMode={props.user.role === 'NDH' ? 'checkbox' : ''}
            selectionKeys={selectedFileKeys}
            onSelectionChange={(e) => setSelectedFileKeys(e.value)}
          >
            <Column field="name" header="Tên" expander style={{ width: '300px' }} />
            <Column field="id" header="Mã" />
            <Column field="type" header="Loại" />
            <Column
              field="thu_tu_hanh_dong"
              header="Thứ tự HĐTHN"
              style={{ textAlign: 'center' }}
            />
            <Column
              field="thu_tu_uu_tien"
              header="Thứ tự ưu tiên"
              style={{ textAlign: 'center' }}
            />
            <Column field="ty_trong" header="Tỷ trọng (%)" style={{ textAlign: 'center' }} />
            {props.user.role === 'NDH' && (
              <Column style={{ textAlign: 'center' }} body={renderColumnAction} />
            )}
          </TreeTable>
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

export default connect(mapStateToProps)(DanhMucHanhDongThuHoiNo)
