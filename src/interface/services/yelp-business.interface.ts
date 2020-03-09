import IYelpLocation from "./yelp-location.interface";

export interface IYelpBusiness {

  id: string
  alias: string
  name: string
  image_url: string
  is_closed: boolean,
  url: string,
  review_count: number,
  categories: { alias: string, title: string }[],
  rating: number,
  coordinates: {
    latitude: number,
    longitude: number
  },
  transactions: string[],
  price: string,
  location: IYelpLocation,
  phone: string,
  display_phone: string,
  distance: number
}

export default IYelpBusiness