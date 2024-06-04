import DashboardNhanVien from 'apis/dashboard/dashboard-nhan-vien/dashboard-nhan-vien'

export const getCountOfActions = (query) =>
  DashboardNhanVien.getCountOfActions(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
