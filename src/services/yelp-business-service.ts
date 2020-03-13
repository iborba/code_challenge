import { axiosApi } from "./api"
import { IncomingHttpHeaders } from "http";
import { error_no_token_provided } from '../config/messages'
import { AxiosRequestConfig } from "axios";

export class YelpBusinessService {
  async getBusiness(headers: IncomingHttpHeaders) {
    try {
      if (headers.authorization === '')
        throw new Error(error_no_token_provided)

      const { authorization } = headers
      const result = await axiosApi.get(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: { authorization } })

      return result.data.businesses
    } catch (error) {
      return error
    }
  }
}