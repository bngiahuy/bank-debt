import TUAPAPI from 'apis/tam-ung-an-phi/tam-ung-an-phi'

export const addTUAP = (body) =>
  TUAPAPI.addTUAP(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getListTUAP = (query) =>
  TUAPAPI.getListTUAP(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
