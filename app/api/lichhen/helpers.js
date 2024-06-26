export const getDateTime = () => {
  const dateTime = new Date()
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() < 10 ? `0${dateTime.getMonth() + 1}` : dateTime.getMonth() + 1
  const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
  const hour = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : dateTime.getHours()
  const minute = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes()
  const second = dateTime.getSeconds() < 10 ? `0${dateTime.getSeconds()}` : dateTime.getSeconds()
  const returnData = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  return returnData
}
function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime()
  return isNumeric(newTimestamp)
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function checkStringIsCharacters(string) {
  // check for only letters (a-zA-Z) and whitespace
  const regex = /^[\p{L}\s]+$/u
  return regex.test(string)
}
