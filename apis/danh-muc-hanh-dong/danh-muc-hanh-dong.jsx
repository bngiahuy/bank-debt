import HTTPService from 'services/HTTPServices'

const DanhMucHanhDongAPI = {
  getListActionCategories: () => HTTPService.sendRequest('get', `api/v1/hanh-dong`),
  addActionCategory: (body) => HTTPService.sendRequest('post', 'api/v1/hanh-dong', body),
  deleteActionCategory: (code) => HTTPService.sendRequest('delete', `api/v1/hanh-dong/${code}`),
  updateActionCategory: (code, body) =>
    HTTPService.sendRequest('patch', `api/v1/hanh-dong/${code}`, body),
}

export default DanhMucHanhDongAPI
