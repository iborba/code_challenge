import IReview from "./review.interface";

interface IBusinessReview {
  id: string
  name: string
  address: string
  reviews: IReview[]
}

export default IBusinessReview