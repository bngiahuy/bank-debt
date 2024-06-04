import HTTPService from 'services/HTTPServices'

const DuNoTheTDAPI = {
  addDuNoTheTD: (body) => HTTPService.sendRequest('post', 'api/thongtinduno', body),
}

export default DuNoTheTDAPI
