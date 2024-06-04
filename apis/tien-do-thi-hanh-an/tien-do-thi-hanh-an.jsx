import HTTPService from 'services/HTTPServices'

const JudgmentAPI = {
  addJudgment: (body) => HTTPService.sendRequest('post', 'api/v1/thi-hanh-an', body),
  getJudgments: (query) =>
    HTTPService.sendRequest('get', `api/v1/thi-hanh-an${query ? '?' + query : ''}`),
  getDetailJudgment: (id) => HTTPService.sendRequest('get', `api/v1/thi-hanh-an/${id}`),
  updateJudgment: (id, body) => HTTPService.sendRequest('patch', `api/v1/thi-hanh-an/${id}`, body),
}

export default JudgmentAPI
