import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { BusinessController } from '../controllers/business.controller'
import { BusinessReviewsController } from '../controllers/business-reviews.controller'
import { yelpBusinessService } from './yelp-business-service'
export class BusinessReviewsService {
  businessController = new BusinessController()
  businessReviewsController = new BusinessReviewsController()

  reviews = async (req: Request, res: Response) => {
    try {

      const headers = { Authorization: req.headers.authorization }
      const businessList = await yelpBusinessService.getBusiness(headers)
      const businesses = await this.businessController.getBusiness(businessList)
      const reviews = await this.businessReviewsController.getReviews(businesses, headers);

      return res.status(OK).json(reviews);
    }
    catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
