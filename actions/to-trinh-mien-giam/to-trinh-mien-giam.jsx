import TTMGAPI from 'apis/to-trinh-mien-giam/to-trinh-mien-giam'

export const addTTMG = (body) =>
  TTMGAPI.addTTMG(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getListTTMG = (query) =>
  TTMGAPI.getListTTMG(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getDetailTTMG = (code) =>
  TTMGAPI.getDetailTTMG(code)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const updateTTMG = (code, body) =>
  TTMGAPI.updateTTMG(code, body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const deleteTTMG = (code) =>
  TTMGAPI.deleteTTMG(code)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
