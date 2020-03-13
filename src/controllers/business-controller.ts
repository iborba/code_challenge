import { IBusiness } from "../interface/controllers/business.interface";
import { IYelpBusiness } from "../interface/services/yelp-business.interface";
export class BusinessController {
  async getBusiness(businessList: IYelpBusiness[]): Promise<IBusiness[]> {
    if (businessList.length < 1)
      return []

    const target = businessList.map(business => {
      const location = business.location.display_address.join(" ")

      return { id: business.id, name: business.name, location }
    })

    return target
  }
}
