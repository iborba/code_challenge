import IReview from "./review.interface";
import ILocation from "./location.interace";

interface IBusiness {
  id: string
  name: string
  location: ILocation
  reviews: IReview[]
}

export default IBusiness