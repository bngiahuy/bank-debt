import HTTPService from 'services/HTTPServices'

const LawsuitProcessAPI = {
  getListLawsuit: (query) =>
    HTTPService.sendRequest('get', `api/v1/khoi-kien${query ? '?' + query : ''}`),
  getDetailLawsuit: (code) => HTTPService.sendRequest('get', `api/v1/khoi-kien/${code}`),
  updateLawsuit: (id, body) => HTTPService.sendRequest('patch', `api/v1/khoi-kien/${id}`, body),
  addLawsuit: (body) => HTTPService.sendRequest('post', 'api/v1/khoi-kien', body),
  getListLawsuitFilter: (body) => HTTPService.sendRequest('post', `api/filter_khoikien`, body),
}

export default LawsuitProcessAPI
