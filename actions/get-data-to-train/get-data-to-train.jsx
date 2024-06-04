import GetDataToTrainAPI from 'apis/get-data-to-train/get-data-to-train'

export const getDataToTrain = () =>
  GetDataToTrainAPI.getDataToTrain()
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
