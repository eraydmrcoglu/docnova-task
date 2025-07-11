import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api-dev.docnova.ai',
})

instance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user?.jwt) {
    config.headers['R-Auth'] = user.jwt
  }
  return config
})

export default instance;
