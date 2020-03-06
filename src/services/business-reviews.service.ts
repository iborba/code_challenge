import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { businessController } from '../controllers/business.controller'
import { businessReviewsController } from '../controllers/business-reviews.controller'
import { yelpBusinessService } from './yelp-business-service'
class BusinessReviewsService {
  reviews = async (req: Request, res: Response) => {
    try {
      const headers = { Authorization: req.headers.authorization }
      const businessList = await yelpBusinessService.getBusiness(headers)
      const businesses = await businessController.getBusiness(businessList)
      const reviews = await businessReviewsController.getReviews(businesses, headers);

      return res.status(OK).json(reviews);
    }
    catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

const businessReviewsService = new BusinessReviewsService()
export { businessReviewsService }
