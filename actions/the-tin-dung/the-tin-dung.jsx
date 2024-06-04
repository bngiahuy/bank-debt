import TheTinDungAPI from 'apis/the-tin-dung/the-tin-dung'

export const addTheTinDung = (body) =>
  TheTinDungAPI.addTheTinDung(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
