import DashboardQuanLy from 'apis/dashboard/dashboard-quan-ly/dashboard-quan-ly'

export const getTongTyTrongOfStaffs = (query) =>
  DashboardQuanLy.getTongTyTrongOfStaffs(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getCustomerCountOfStaffs = (query) =>
  DashboardQuanLy.getCustomerCountOfStaffs(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
