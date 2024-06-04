import TTDGKKAPI from 'apis/to-trinh-danh-gia-khoi-kien/to-trinh-danh-gia-khoi-kien'

export const addTTDGKK = (body) =>
  TTDGKKAPI.addTTDGKK(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getListTTDGKK = (query) =>
  TTDGKKAPI.getListTTDGKK(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getDetailTTDGKK = (code) =>
  TTDGKKAPI.getDetailTTDGKK(code)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const deleteTTDGKK = (code) =>
  TTDGKKAPI.deleteTTDGKK(code)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const updateTTDGKK = (code, body) =>
  TTDGKKAPI.updateTTDGKK(code, body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
