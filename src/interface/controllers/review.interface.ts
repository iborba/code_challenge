import IYelpUser from "../services/yelp-user.interface";

interface IReview {
  text: string
  rating: number
  user: string
}

export default IReview