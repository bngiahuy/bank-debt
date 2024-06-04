import HTTPService from 'services/HTTPServices'

const TTDGKKAPI = {
  getListTTDGKK: (query) =>
    HTTPService.sendRequest('get', `api/v1/to-trinh-khoi-kien${query ? '?' + query : ''}`),
  getDetailTTDGKK: (code) => HTTPService.sendRequest('get', `api/v1/to-trinh-khoi-kien/${code}`),
  updateTTDGKK: (code, body) =>
    HTTPService.sendRequest('patch', `api/v1/to-trinh-khoi-kien/${code}`, body),
  addTTDGKK: (body) => HTTPService.sendRequest('post', 'api/v1/to-trinh-khoi-kien', body),
  deleteTTDGKK: (code) => HTTPService.sendRequest('delete', `api/v1/to-trinh-khoi-kien/${code}`),
}

export default TTDGKKAPI
