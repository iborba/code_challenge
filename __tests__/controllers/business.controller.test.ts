import { BusinessController } from '../../src/controllers/business-controller'
const data = {
  businesses: [
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
        "address3": null,
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
    },
    {
      "id": "s1mE82VEw5GqONY8cdZ_dA",
      "alias": "boba-mocha-duluth",
      "name": "Boba Mocha",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/TswqGx1iOOJTL83QV0lsuQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/boba-mocha-duluth?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
      "review_count": 499,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        },
        {
          "alias": "bubbletea",
          "title": "Bubble Tea"
        },
        {
          "alias": "icecream",
          "title": "Ice Cream & Frozen Yogurt"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 33.9711708777899,
        "longitude": -84.1478902172178
      },
      "transactions": [
        "delivery"
      ],
      "price": "$",
      "location": {
        "address1": "2628 Pleasant Hill Rd",
        "address2": "Ste 100",
        "address3": "",
        "city": "Duluth",
        "zip_code": "30096",
        "country": "US",
        "state": "GA",
        "display_address": [
          "2628 Pleasant Hill Rd",
          "Ste 100",
          "Duluth, GA 30096"
        ]
      },
      "phone": "+16783673757",
      "display_phone": "(678) 367-3757",
      "distance": 16394.449923570268
    }
  ]
}

describe('Happy path', () => {
  it('sould return a list of resumed businesses', async () => {
    const controller = new BusinessController()

    const result = await controller.getBusiness(data.businesses)

    expect(result).not.toBeNull()
    expect(typeof result).toEqual('object')
    expect(result.length).toBeGreaterThan(0)

    result.map(b => {
      expect(b).toHaveProperty(['id'])
      expect(b).toHaveProperty(['name'])
      expect(b).toHaveProperty(['location'])
    })
  })

  it('should return an empty array when receive an emtpy input', async () => {
    const controller = new BusinessController()

    const result = await controller.getBusiness([])

    expect(result).not.toBeNull()
    expect(typeof result).toEqual('object')
    expect(result.length).toEqual(0)
    expect(result).toEqual([])
  })
})