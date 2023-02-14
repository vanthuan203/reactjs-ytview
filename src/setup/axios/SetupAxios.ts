

import axios from 'utils/AxiosConfig';

export default function setupAxios(store: any) {
  const {
    auth: {accessToken},
  } = store.getState()
  axios.defaults.headers.common['Authorization'] = accessToken || "";
}
