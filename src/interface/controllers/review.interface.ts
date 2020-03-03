import IUser from "./user.interface";

interface IReview {
  text: string
  rating: string
  user: IUser
}

export default IReview