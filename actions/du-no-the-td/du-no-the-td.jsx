import DuNoTheTDAPI from 'apis/du-no-the-td/du-no-the-td'

export const addDuNoTheTD = (body) =>
  DuNoTheTDAPI.addDuNoTheTD(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
