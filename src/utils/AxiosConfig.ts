import axios from 'axios';
export const BASE_URL=process.env.REACT_APP_API_URL
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
});
export function setupAxios(store: any) {
  const {
    auth: {accessToken},
  } = store.getState()
  axios.defaults.headers.common['Authorization'] = accessToken || "";
}
export function setupAxiosByToken(accessToken:string) {
  axios.defaults.headers.common['Authorization'] = accessToken || "";
}