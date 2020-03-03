import { Router, Request, Response } from 'express'
import { businessController } from './controllers/business'
const routes = Router();

routes.get('/', (_req: Request, res: Response) => { res.status(200).send("Welcome home") })
routes.get('/business', businessController.business)
routes.get('/business/reviews', businessController.reviews)

export { routes }