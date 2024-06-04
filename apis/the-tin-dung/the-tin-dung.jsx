import HTTPService from 'services/HTTPServices'

const TheTinDungAPI = {
    addTheTinDung: (body) => HTTPService.sendRequest('post', 'api/tai_khoan_the/the_tin_dung', body),
}

export default TheTinDungAPI