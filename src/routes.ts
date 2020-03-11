import { Router, Request, Response } from 'express'
import { BusinessService } from './services/business.service'
import { BusinessReviewsService } from './services/business-reviews.service'
import { OK } from 'http-status-codes'
import { headerValidator } from './middlewares/validators/headers'

export class Routes {
  routes: Router
  constructor() {
    this.routes = Router()

    this.routes.get('/', (_req: Request, res: Response) => { res.status(OK).send("Welcome home") })
    this.routes.get('/business', headerValidator, new BusinessService().business)
    this.routes.get('/business/reviews', headerValidator, new BusinessReviewsService().reviews)
  }
}