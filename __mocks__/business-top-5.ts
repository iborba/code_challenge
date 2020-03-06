import IYelpBusiness from "../src/interface/services/yelp-business.interface";

const businesses: IYelpBusiness[] = [
  {
    "id": "v21jReWx5dd5KuQ0QS6Dog",
    "alias": "screamn-nuts-alpharetta",
    "name": "Scream'n Nuts",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/-N0_wC4BPcv2yVjhcW4FYg/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
    "review_count": 309,
    "categories": [
      {
        "alias": "donuts",
        "title": "Donuts"
      },
      {
        "alias": "icecream",
        "title": "Ice Cream & Frozen Yogurt"
      },
      {
        "alias": "coffee",
        "title": "Coffee & Tea"
      }
    ],
    "rating": 4.5,
    "coordinates": {
      "latitude": 34.049333,
      "longitude": -84.281247
    },
    "transactions": [
      "delivery"
    ],
    "price": "$",
    "location": {
      "address1": "5950 North Point Pkwy",
      "address2": "",
      "address3": "",
      "city": "Alpharetta",
      "zip_code": "30022",
      "country": "US",
      "state": "GA",
      "display_address": [
        "5950 North Point Pkwy",
        "Alpharetta, GA 30022"
      ]
    },
    "phone": "+14044744766",
    "display_phone": "(404) 474-4766",
    "distance": 2264.570336710685
  }]

export const businessData = Promise.resolve(businesses)