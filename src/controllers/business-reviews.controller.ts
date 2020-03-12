import { IBusinessReview } from "../interface/controllers/business-review.interface";
import { YelpReviewService } from '../services/yelp-review-service'
import { IBusiness } from "../interface/controllers/business.interface";
export class BusinessReviewsController {
  async getReviews(businesses: IBusiness[], headers: object): Promise<IBusinessReview[]> {
    try {
      const yelpReviewsService = new YelpReviewService()

      const targetPromises = businesses.map(async business => {
        const { id, name, location } = business
        const reviewList = await yelpReviewsService.getBusinessReviews(id, headers)

        const reviews = reviewList.reviews.map(review => {
          return { text: review.text, rating: review.rating, user: review.user.name }
        })

        return { id, name, address: location, reviews }
      });

      return Promise.all(targetPromises)
    } catch (error) {
      return error
    }
  }
}