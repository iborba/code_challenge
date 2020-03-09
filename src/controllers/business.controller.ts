import IBusiness from "../interface/controllers/business.interface";
import IYelpBusiness from "../interface/services/yelp-business.interface";
import IYelpBusinesess from "../interface/services/yelp-businesses.interface";
class BusinessController {
  async getBusiness(businessList: IYelpBusinesess): Promise<IBusiness[]> {
    const target = businessList.businesses.map(business => {
      const location = business.location.display_address.join(" ")

      return { id: business.id, name: business.name, location }
    })

    return target
  }
}

const businessController = new BusinessController()
export { businessController }
