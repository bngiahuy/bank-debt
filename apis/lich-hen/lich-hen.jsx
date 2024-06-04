import HTTPService from 'services/HTTPServices'

const AppointmentAPI = {
  getListAppointments: (query) =>
    HTTPService.sendRequest('get', `api/v1/lich-hen${query ? '?' + query : ''}`),
  addAppointment: (body) => HTTPService.sendRequest('post', 'api/v1/lich-hen', body),
  getListAppointmentFilter: (body) => HTTPService.sendRequest('post', `api/filter_lichhen`, body),
}

export default AppointmentAPI
