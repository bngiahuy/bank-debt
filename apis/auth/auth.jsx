import HTTPService from 'services/HTTPServices'

const AuthAPI = {
  signIn: (body) => HTTPService.sendRequest('post', `api/v1/auth/sign-in`, body),
  signUp: (body) => HTTPService.sendRequest('post', `api/v1/auth/user`, body),
  signOut: () => HTTPService.sendRequest('post', `api/v1/auth/sign-out`),
}

export default AuthAPI
