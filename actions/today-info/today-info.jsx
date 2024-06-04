import TodayInfoAPI from 'apis/today-info/today-info'

export const getTodayInfoSHB = (query) =>
  TodayInfoAPI.getTodayInfoSHB(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getTodayInfoNPD = (query) =>
  TodayInfoAPI.getTodayInfoNPD(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
