import HTTPService from 'services/HTTPServices'

const DanhMucKQHanhDongAPI = {
  getListActionCategoryResults: () => HTTPService.sendRequest('get', `api/v1/ket-qua`),
  addActionCategoryResult: (body) => HTTPService.sendRequest('post', 'api/v1/ket-qua', body),
  deleteActionCategoryResult: (code) => HTTPService.sendRequest('delete', `api/v1/ket-qua/${code}`),
  updateActionCategoryResult: (code, body) =>
    HTTPService.sendRequest('patch', `api/v1/ket-qua/${code}`, body),
}

export default DanhMucKQHanhDongAPI
