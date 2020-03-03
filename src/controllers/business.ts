import { Request, Response, response } from "express";
import IBusiness from "../interface/controllers/business.interface";
import IReview from "../interface/controllers/review.interface";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import api from '../services/api'

class BusinessController {
  private path = 'businesses'
  private headers: object = {}
  private async getBusiness(): Promise<IBusiness[]> {
    const businessList = await api.get(`/${this.path}/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: this.headers })

    return businessList.data.businesses.map((data: IBusiness) => {
      return { id: data.id, name: data.name, location: data.location }
    })
  }

  private async getReviews(): Promise<IBusiness[]> {
    const businesses = await this.getBusiness()

    const targetPromises = businesses.map(async business => {
      const { id, name, location } = business
      const reviewList = await api.get(`/${this.path}/${id}/reviews`, { headers: this.headers })

      return {
        id, name, location, reviews: reviewList.data.reviews.map((review: IReview) => {
          return { text: review.text, rating: review.rating, user: review.user }
        })
      }
    });

    return Promise.all(targetPromises)
  }
  index = (_req: Request, res: Response) => {
    return res.status(OK).json({ value: "Welcome Business home" });
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
