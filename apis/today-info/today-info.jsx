import HTTPService from 'services/HTTPServices'

const TodayInfoAPI = {
  getTodayInfoSHB: (query) =>
    HTTPService.sendRequest('get', `api/v1/today-info/shb${query ? '?' + query : ''}`),
  getTodayInfoNPD: (query) =>
    HTTPService.sendRequest('get', `api/v1/today-info/npd${query ? '?' + query : ''}`),
}

export default TodayInfoAPI
