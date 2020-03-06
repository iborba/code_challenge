import axiosApi from "./api"
import IYelpReview from "../interface/services/yelp-review.interface"
import IYelpBusiness from "../interface/services/yelp-business.interface"
class YelpBusinessService {
  async getBusiness(headers: object): Promise<IYelpBusiness[]> {
    const result = await axiosApi.get(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers })

    return result.data
  }

  async getBusinessReviews(id: string, headers: object): Promise<IYelpReview[]> {
    const result = await axiosApi.get(`/businesses/${id}/reviews`, { headers })

    return result.data
  }
}

const yelpBusinessService = new YelpBusinessService()
export { yelpBusinessService }