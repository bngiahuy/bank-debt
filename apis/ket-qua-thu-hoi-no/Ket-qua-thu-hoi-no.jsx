import HTTPService from 'services/HTTPServices'

const KqthnAPI = {
  getListActions: (query) =>
    HTTPService.sendRequest('get', `api/v1/lich-su-hanh-dong${query ? '?' + query : ''}`),
  //   getDetailCustomer: id => HTTPService.sendRequest('get', `api/khachhang/${id}`),
  //   deleteCustomer: id => HTTPService.sendRequest('delete', `api/khachhang/${id}`),
  addDebtRecoveryResult: (body) =>
    HTTPService.sendRequest('post', 'api/v1/lich-su-hanh-dong', body),
  updateDebtRecoveryResult: (id, body) =>
    HTTPService.sendRequest('patch', `api/v1/lich-su-hanh-dong/${id}`, body),
}

export default KqthnAPI
