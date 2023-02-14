import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton } from 'utils/ApiHelper'
const API_URL = process.env.REACT_APP_API_URL
export const REQUEST_PASSWORD_URL = `${API_URL}auth/forgot_password`
// Server should return AuthModel
export async function login(email: string, password: string) {
  const res = await postWithoutTokenFunciton("auth/login", {
    username: email,
    password: password,
  })
  return res
}

// Server should return AuthModel
export async function register(username: string, password: string) {
  const res = await postWithoutTokenFunciton("auth/register", {
    username: username,
    password: password,
  })
  return res
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(username: string) {
  return axios.get<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    params: {
      username: username,
    },
  })
}

export async function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  const res:any = await getFunciton("auth/verify_token")
  return res
}
