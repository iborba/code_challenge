import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'https://api.yelp.com/v3'
})

export default axiosApi