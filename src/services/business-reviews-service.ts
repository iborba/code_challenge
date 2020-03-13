import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { BusinessController } from '../controllers/business.controller'
import { BusinessReviewsController } from '../controllers/business-reviews.controller'
import { YelpBusinessService } from './yelp-business-service'
import { error_no_token_provided } from '../config/messages'

export class BusinessReviewsService {
  reviews = async (req: Request, res: Response) => {
    try {
      if (req.headers.authorization === '')
        throw new Error(error_no_token_provided)

      const yelpBusinessService = new YelpBusinessService()
      const businessController = new BusinessController()
      const businessReviewsController = new BusinessReviewsController()
      
      const headers = { authorization: req.headers.authorization }
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
