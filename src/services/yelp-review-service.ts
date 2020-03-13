import { axiosApi } from "./api"
import { IncomingHttpHeaders } from "http"
import { error_no_token_provided, error_one_or_more_params_invalid } from '../config/messages'
export class YelpReviewService {
  async getBusinessReviews(businessId: string, headers: IncomingHttpHeaders) {
    try {
      if (headers.authorization === '')
        throw new Error(error_no_token_provided)

      if (!businessId)
        throw new Error(error_one_or_more_params_invalid)

      const { authorization } = headers
      const result = await axiosApi.get(`/businesses/${businessId}/reviews`, { headers: { authorization } })
      return result.data.reviews
    } catch (error) {
      return error
    }
  }
}