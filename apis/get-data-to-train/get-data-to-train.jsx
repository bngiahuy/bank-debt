import HTTPService from 'services/HTTPServices'

const GetDataToTrainAPI = {
  getDataToTrain: () => HTTPService.sendRequest('get', `api/v1/data-to-train-AI`),
}

export default GetDataToTrainAPI
