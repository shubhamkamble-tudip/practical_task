import axios from 'axios'

const baseURL = `https://dummyapi.io/data/api`
const timeout = 5000

/*
 * Instantiation of axios with defaults
 */
const defaultOptions = {
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  };
const axiosInstance = axios.create({
    baseURL,
    timeout,
    headers: {
        'app-id': "60afc66b63c7ff19a2bd8c37"
    },
})

export default axiosInstance
