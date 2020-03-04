import { Request, Response, response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import api from '../services/api'
import IBusiness from "../interface/controllers/business.interface";
import IReview from "../interface/controllers/review.interface";
import IBusinessReview from "../interface/controllers/business-review.interface";

class BusinessController {
  private headers: object = {}
  async getBusiness(): Promise<IBusiness[]> {
    const businessList = await api.get(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: this.headers })

    return businessList.data.businesses.map((data: IBusiness) => {
      return { id: data.id, name: data.name, location: data.location }
    })
  }

  async getReviews(): Promise<IBusinessReview[]> {
    const businesses = await this.getBusiness()

    const targetPromises = businesses.map(async business => {
      const { id, name, location } = business
      const reviewList = await api.get(`/businesses/${id}/reviews`, { headers: this.headers })

      return {
        id, name, address: location.display_address, reviews: reviewList.data.reviews.map((review: IReview) => {
          return { text: review.text, rating: review.rating, user: review.user.name }
        })
      }
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
