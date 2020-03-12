import { IYelpUser } from "./yelp-user.interface";

export interface IYelpReview {
  id: string
  url: string
  text: string
  rating: number
  time_created: string
  user: IYelpUser
}
