import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3'
})

export default api