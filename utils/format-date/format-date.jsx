export const formatDate = (Date) => {
  const year = Date.getFullYear()
  const month = Date.getMonth() + 1 < 10 ? `0${Date.getMonth() + 1}` : Date.getMonth() + 1
  const day = Date.getDate() < 10 ? `0${Date.getDate()}` : Date.getDate()
  return `${day}/${month}/${year}`
}
