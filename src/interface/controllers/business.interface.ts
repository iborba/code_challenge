import IReviews from "./reviews.interface";

interface IBusiness {
  id: string
  name: string
  location: string[]
  reviews: IReviews
}

export default IBusiness