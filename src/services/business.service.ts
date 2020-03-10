import { Request, Response } from "express";
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { yelpBusinessService } from './yelp-business-service'
import { BusinessController } from '../controllers/business.controller'
class BusinessService {
  businessController = new BusinessController()
  business = async (req: Request, res: Response) => {
    try {
      const headers = { Authorization: req.headers.authorization }
      const businessList = await yelpBusinessService.getBusiness(headers)
      const data = await this.businessController.getBusiness(businessList);

      return res.status(OK).json(data)
    }
    catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
  }
}

const businessService = new BusinessService()
export { businessService }
