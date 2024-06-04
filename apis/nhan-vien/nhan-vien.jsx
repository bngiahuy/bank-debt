import HTTPService from 'services/HTTPServices'

const StaffAPI = {
  getListStaff: (query) => HTTPService.sendRequest('get', `api/v1/auth/user?${query}`),
  deleteStaff: (id) => HTTPService.sendRequest('delete', `api/nhanvien/${id}`),
  addStaff: (body) => HTTPService.sendRequest('post', 'api/nhanvien', body),
}

export default StaffAPI
