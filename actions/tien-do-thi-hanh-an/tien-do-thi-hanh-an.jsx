import JudgmentAPI from 'apis/tien-do-thi-hanh-an/tien-do-thi-hanh-an'

export const addJudgment = (body) =>
  JudgmentAPI.addJudgment(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getJudgments = (query) =>
  JudgmentAPI.getJudgments(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const getDetailJudgment = (id) =>
  JudgmentAPI.getDetailJudgment(id)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const updateJudgment = (id, body) =>
  JudgmentAPI.updateJudgment(id, body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
