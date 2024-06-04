import HTTPService from 'services/HTTPServices'

const GetDataToPredictAPI = {
  getDataToPredict: (query) =>
    HTTPService.sendRequest('get', `api/v1/data-to-predict${query ? '?' + query : ''}`),
}

export default GetDataToPredictAPI
