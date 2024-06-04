import DanhMucKQHanhDongAPI from 'apis/danh-muc-ket-qua-hanh-dong/danh-muc-ket-qua-hanh-dong'

export const addActionCategoryResult = (body) =>
  DanhMucKQHanhDongAPI.addActionCategoryResult(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getListActionCategoryResults = () =>
  DanhMucKQHanhDongAPI.getListActionCategoryResults()
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const deleteActionCategoryResult = (code) =>
  DanhMucKQHanhDongAPI.deleteActionCategoryResult(code)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const updateActionCategoryResult = (code, body) =>
  DanhMucKQHanhDongAPI.updateActionCategoryResult(code, body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
