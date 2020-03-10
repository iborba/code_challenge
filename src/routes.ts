import { Router, Request, Response } from 'express'
import { businessService } from './services/business.service'
import { BusinessReviewsService } from './services/business-reviews.service'
import { OK } from 'http-status-codes'
import { headerValidator } from './middlewares/validators/headers'

const routes = Router();

routes.get('/', (_req: Request, res: Response) => { res.status(OK).send("Welcome home") })
routes.get('/business', headerValidator, businessService.business)
routes.get('/business/reviews', headerValidator, new BusinessReviewsService().reviews)

export { routes }