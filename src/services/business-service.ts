import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { YelpBusinessService } from './yelp-business-service'
import { BusinessController } from '../controllers/business.controller'
import { error_no_token_provided } from "../config/messages";

export class BusinessService {
  business = async (req: Request, res: Response) => {
    try {
      if (req.headers.authorization === '')
        throw new Error(error_no_token_provided)

      const businessController = new BusinessController()
      const yelpBusinessService = new YelpBusinessService()

      const businessList = await yelpBusinessService.getBusiness(req.headers)
      const data = await businessController.getBusiness(businessList);
      
      return res.status(OK).json(data)
    }
    catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
