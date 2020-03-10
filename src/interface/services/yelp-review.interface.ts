import { IYelpUser } from "./yelp-user.interface";

export interface IYelpReview {
  reviews: [{
    id: string
    url: string
    text: string
    rating: number
    time_created: string
    user: IYelpUser
  }]
}
