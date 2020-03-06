import { Request, Response, response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import IBusiness from "../interface/controllers/business.interface";
import IBusinessReview from "../interface/controllers/business-review.interface";
import { yelpBusinessService } from '../services/yelp-business-service'
import { IYelpReview } from '../../src/interface/services/yelp-review.interface'
class BusinessController {
  private headers: object = {}

  async getBusiness(): Promise<IBusiness[]> {
    const businessList = await yelpBusinessService.getBusiness(this.headers)

    const target = businessList.businesses.map(business => {
      const location = business.location.display_address.join(" ")

      return { id: business.id, name: business.name, location }
    })

    return target
  }

  async getReviews(): Promise<IBusinessReview[]> {
    const businesses = await this.getBusiness()

    const targetPromises = businesses.map(async business => {
      const { id, name, location } = business
      const reviewList = await yelpBusinessService.getBusinessReviews(id, this.headers)

      const reviews = reviewList.reviews.map(review => {
        return { text: review.text, rating: review.rating, user: review.user.name }
      })

      return { id, name, address: location, reviews }
    });

    return Promise.all(targetPromises)
  }
  /*************************************************************************************/
  /*************************************************************************************/
  /*************************************************************************************/
  /*************************************************************************************/
  business = async (req: Request, res: Response) => {
    try {
      this.headers = { Authorization: req.headers.authorization }
      const data = await this.getBusiness();

      return res.status(OK).json(data);
    }
    catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  }

  reviews = async (req: Request, res: Response) => {
    try {
      this.headers = { Authorization: req.headers.authorization }
      const data = await this.getReviews();

      return res.status(OK).json(data);
    }
    catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

const businessController = new BusinessController()
export { businessController }
