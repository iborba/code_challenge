import { axiosApi } from "./api"
import { IncomingHttpHeaders } from "http";
import { error_no_token_provided } from '../config/messages'

export class YelpBusinessService {
  async getBusiness(headers: IncomingHttpHeaders) {
    try {
      if (headers.authorization === '')
        throw new Error(error_no_token_provided)

      const result = await axiosApi.get(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers })

      return result
    } catch (error) {
      return error
    }
  }
}