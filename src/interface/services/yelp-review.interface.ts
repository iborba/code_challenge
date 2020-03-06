import IYelpUser from "./yelp-user.interface";

interface IYelpReview {
  id: string
  url: string
  text: string
  rating: number
  time_created: string
  user: IYelpUser
}

export default IYelpReview
