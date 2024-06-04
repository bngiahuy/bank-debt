import HTTPService from 'services/HTTPServices'

const DashboardNhanVien = {
  getCountOfActions: (query) =>
    HTTPService.sendRequest('get', `api/dashboard/tinhhinhthuhoino${query ? '?' + query : ''}`),
}

export default DashboardNhanVien
