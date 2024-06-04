import HTTPService from 'services/HTTPServices'

const TTMGAPI = {
  getListTTMG: (query) =>
    HTTPService.sendRequest('get', `api/v1/to-trinh-mien-giam${query ? '?' + query : ''}`),
  getDetailTTMG: (code) => HTTPService.sendRequest('get', `api/v1/to-trinh-mien-giam/${code}`),
  updateTTMG: (code, body) =>
    HTTPService.sendRequest('patch', `api/v1/to-trinh-mien-giam/${code}`, body),
  addTTMG: (body) => HTTPService.sendRequest('post', 'api/v1/to-trinh-mien-giam', body),
  deleteTTMG: (code) => HTTPService.sendRequest('delete', `api/v1/to-trinh-mien-giam/${code}`),
}

export default TTMGAPI
