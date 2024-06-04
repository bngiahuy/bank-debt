import GetDataToPredictAPI from 'apis/get-data-to-predict/get-data-to-predict'

export const getDataToPredict = (query) =>
  GetDataToPredictAPI.getDataToPredict(query)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
