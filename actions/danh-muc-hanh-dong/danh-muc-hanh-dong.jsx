import DanhMucHanhDongAPI from 'apis/danh-muc-hanh-dong/danh-muc-hanh-dong'

export const addActionCategory = (body) =>
  DanhMucHanhDongAPI.addActionCategory(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getListActionCategories = () =>
  DanhMucHanhDongAPI.getListActionCategories()
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const deleteActionCategory = (code) =>
  DanhMucHanhDongAPI.deleteActionCategory(code)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const updateActionCategory = (code, body) =>
  DanhMucHanhDongAPI.updateActionCategory(code, body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
