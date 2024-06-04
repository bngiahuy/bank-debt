import AuthAPI from 'apis/auth/auth'

export const signIn = (body) =>
  AuthAPI.signIn(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const signUp = (body) =>
  AuthAPI.signUp(body)
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)

export const signOut = () =>
  AuthAPI.signOut()
    .then((res) => {
      const { isError, data, err } = res
      return isError ? err : data
    })
    .catch((error) => error)
