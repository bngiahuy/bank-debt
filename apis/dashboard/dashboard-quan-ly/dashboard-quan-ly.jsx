import HTTPService from 'services/HTTPServices'

const DashboardQuanLy = {
  getTongTyTrongOfStaffs: (query) =>
    HTTPService.sendRequest('get', `api/dashboard/tongtytrong${query ? '?' + query : ''}`),
  getCustomerCountOfStaffs: (query) =>
    HTTPService.sendRequest('get', `api/dashboard/quanlykhachhang${query ? '?' + query : ''}`),
}

export default DashboardQuanLy
