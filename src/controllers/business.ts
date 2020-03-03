import { Request, Response, response } from "express";
import axios, { AxiosRequestConfig } from 'axios'
import { config as dotEnvConfig } from "dotenv";
import IBusiness from "../interface/controllers/business.interface";
import IReviews from "../interface/controllers/reviews.interface";

dotEnvConfig()

class BusinessController {
  private endpoint: string
  private options: AxiosRequestConfig
  constructor() {
    this.endpoint = 'businesses'
    this.options = {
      headers: {
        'Authorization': `Bearer ${process.env.TOKEN}`
      }
    }
  }

  index = (_req: Request, res: Response) => {
    return res.status(200).json({ value: "Welcome Business home" });
  }

  private async getBusiness(): Promise<IBusiness[]> {
    const output = await axios.get(`${process.env.HOST}${this.endpoint}/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, this.options)
      .then(business => {
        return business.data.businesses.map((data: any) => {
          const { id, name, location } = data
          return { id, name, location }
        })
      })
      .catch(error => {
        return { statusCode: 400, message: 'Error', error };
      })

    return output
  }

  private async getReviews(businessId: string): Promise<IReviews[]> {
    const output = await axios.get(`${process.env.HOST}${this.endpoint}/${businessId}/reviews`, this.options)
      .then(reviews => {
        return reviews.data.reviews.map((data: IReviews) => {
          const { text, rating, user } = data
          return { text, rating, user }
        })
      })

    return output
  }

  business = (_req: Request, res: Response) => {
    this.getBusiness()
      .then(data => res.status(200).send(data))
      .catch(error => res.status(400).send(error))
  }

  reviews = async (_req: Request, res: Response) => {
    const business = await this.getBusiness()
    let response: any[] = []

    business.map(async b => {
      const { id, name, location } = b
      const reviewsPerBusiness = await this.getReviews(b.id)

      const review = reviewsPerBusiness.map(reviews => {
        const { text, rating, user } = reviews

        return { text, rating, user: user.name }
      })

      response.push({ business: { id, name, location, reviews: review } })
    })

    Promise.all([business]).then(xxx => res.status(200).send(xxx))
  }
}
const businessController = new BusinessController()
export { businessController }
