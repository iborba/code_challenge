import { axiosApi } from "./api"
import { IYelpReview } from "../interface/services/yelp-review.interface"
import { IYelpBusinesess } from "../interface/services/yelp-businesses.interface"
export class YelpBusinessService {
  async getBusiness(headers: object): Promise<IYelpBusinesess> {
    try {
      const result = await axiosApi.get(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers })
      return result.data
    } catch (error) {
      return error
    }
  }
  async getBusinessReviews(id: string, headers: object): Promise<IYelpReview> {
    try {
      const result = await axiosApi.get(`/businesses/${id}/reviews`, { headers })

      return result.data
    } catch (error) {
      return error
    }
  }
}