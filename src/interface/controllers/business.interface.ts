import IReview from "./review.interface";

interface IBusiness {
  id: string
  name: string
  location: any
  reviews: IReview[]
}

export default IBusiness