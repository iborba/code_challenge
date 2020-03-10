import { IReview } from "./review.interface";

export interface IBusinessReview {
  id: string
  name: string
  address: string
  reviews: IReview[]
}