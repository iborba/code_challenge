import { Request, Response, response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import IBusiness from "../interface/controllers/business.interface";
import IReview from "../interface/controllers/review.interface";
import IBusinessReview from "../interface/controllers/business-review.interface";
import { yelpBusinessService } from '../services/yelp-business-service'
import IYelpBusiness from "../interface/services/yelp-business.interface";
import IYelpReview from "../interface/services/yelp-review.interface";

class BusinessController {
  private headers: object = {}

  async getBusiness(): Promise<IBusiness[]> {
    const businessList = await yelpBusinessService.getBusiness(this.headers)

    return businessList.map(business => {
      const location = business.location.display_address.join(" ")

      return { id: business.id, name: business.name, location }
    })
  }

  async getReviews(): Promise<IBusinessReview[]> {
    const businesses = await this.getBusiness()

    const targetPromises = businesses.map(async business => {
      const { id, name, location } = business
      const reviewList = await yelpBusinessService.getBusinessReviews(id, this.headers)

      const reviews = reviewList.map((review: IYelpReview) => {
        return { text: review.text, rating: review.rating, user: review.user.name }
      })

      return { id, name, address: location, reviews }
    });

    return Promise.all(targetPromises)
  }
  business = (req: Request, res: Response) => {
    this.headers = { Authorization: req.headers.authorization }

    return this.getBusiness()
      .then(data => res.status(OK).json(data))
      .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
  }

  reviews = (req: Request, res: Response) => {
    this.headers = { Authorization: req.headers.authorization }

    return this.getReviews()
      .then(data => res.status(OK).json(data))
      .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
  }
}

const businessController = new BusinessController()
export { businessController }
