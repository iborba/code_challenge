import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: 'https://api.yelp.com/v3'
})