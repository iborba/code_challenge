import { Router, Request, Response } from 'express'
import { businessController } from './controllers/business'
import { OK } from 'http-status-codes'
import { headerValidator } from './middlewares/validators/headers'
const routes = Router();

routes.get('/', (_req: Request, res: Response) => { res.status(OK).send("Welcome home") })
routes.get('/business', headerValidator, businessController.business)
routes.get('/business/reviews', headerValidator, businessController.reviews)

export { routes }