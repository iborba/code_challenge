import { axiosApi } from "./api"
import { IYelpBusinesess } from "../interface/services/yelp-businesses.interface"
import { IYelpReviews } from "@app/interface/services/yelp-reviews.interface"
export class YelpBusinessService {
  async getBusiness(headers: object): Promise<IYelpBusinesess> {
    try {
      const result = await axiosApi.get(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers })

      return { businesses: [result.data] }
    } catch (error) {
      return error
    }
  }
  async getBusinessReviews(businessId: string, headers: object): Promise<IYelpReviews> {
    try {
      const result = await axiosApi.get(`/businesses/${businessId}/reviews`, { headers })

      if (result.data.length > 0)
        return { reviews: [result.data] }
      else
        return { reviews: [] }
    } catch (error) {
      return error
    }
  }
}