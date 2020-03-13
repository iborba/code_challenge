import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { YelpBusinessService } from '../../src/services/yelp-business-service'
import { BusinessController } from '../../src/controllers/business-controller'
import { BusinessReviewsController } from '../../src/controllers/business-reviews-controller'
import { BusinessReviewsService } from '../../src/services/business-reviews-service'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes'

jest.mock('../../src/services/yelp-business-service')
jest.mock('../../src/controllers/business-controller')
jest.mock('../../src/controllers/business-reviews-controller')

const mockedYelpBusinessService = <jest.Mock<YelpBusinessService>>YelpBusinessService
const mockedBusinessController = <jest.Mock<BusinessController>>BusinessController
const mockedBusinessReviewsontroller = <jest.Mock<BusinessReviewsController>>BusinessReviewsController

const yelpData = {
  "businesses": [
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
const businessData = [
  {
    "id": "v21jReWx5dd5KuQ0QS6Dog",
    "name": "Scream'n Nuts",
    "location": "5950 North Point Pkwy Alpharetta, GA 30022"
  },
  {
    "id": "s1mE82VEw5GqONY8cdZ_dA",
    "name": "Boba Mocha",
    "location": "2628 Pleasant Hill Rd Ste 100 Duluth, GA 30096"
  },
  {
    "id": "VdcQMPVIIfsiHU2FUOyDNQ",
    "name": "Sweet Spot",
    "location": "6035 Peachtree Rd Ste A-115 Doraville, GA 30341"
  },
  {
    "id": "LKQd5rGpjsoL-FOvfbbdEQ",
    "name": "Where's The Scoop?",
    "location": "9925 Haynes Bridge Rd Ste 510 Johns Creek, GA 30022"
  },
  {
    "id": "0RDGOFcgDhzry4MDopu0-A",
    "name": "Jeni's Splendid Ice Creams",
    "location": "800 Avalon Blvd Alpharetta, GA 30009"
  }
]
const reviewsData = [
  {
    "id": "v21jReWx5dd5KuQ0QS6Dog",
    "name": "Scream'n Nuts",
    "address": "5950 North Point Pkwy Alpharetta, GA 30022",
    "reviews": [
      {
        "text": "Delicious gourmet donuts!  Highly Recommend! \nBread donut pudding and delicious homemade ice cream! Yum! \n\nUnbelievable customer service! They made fresh...",
        "rating": 5,
        "user": "Stacey S."
      },
      {
        "text": "I will start with the good - coffee was great ! People\nAt counter were helpful and patient. They had to be patient because Yelp indicated they had frozen...",
        "rating": 2,
        "user": "Cindi P."
      },
      {
        "text": "I can't even begin to tell you how much we love this place and Natasha (owner). First, she is so community focused and helps out in so many fundraisers and...",
        "rating": 5,
        "user": "Adam W."
      }
    ]
  },
  {
    "id": "s1mE82VEw5GqONY8cdZ_dA",
    "name": "Boba Mocha",
    "address": "2628 Pleasant Hill Rd Ste 100 Duluth, GA 30096",
    "reviews": [
      {
        "text": "I absolutely ADORE this place! I think I just about have taken all of my friends and family to this spot. The boba tea is delicious, and the coffee drinks,...",
        "rating": 5,
        "user": "Zoraida J."
      },
      {
        "text": "5 stars for service, but 3 stars for the food. I used to come here a lot in high school (it was a popular hang out spot back then) so I always love to come...",
        "rating": 4,
        "user": "Monica C."
      },
      {
        "text": "I hate to give this place 3 stars based off going there only once, but I ordered 5 different drinks for my family and I tried all of them and unfortunately...",
        "rating": 3,
        "user": "Anh Thu N."
      }
    ]
  },
  {
    "id": "VdcQMPVIIfsiHU2FUOyDNQ",
    "name": "Sweet Spot",
    "address": "6035 Peachtree Rd Ste A-115 Doraville, GA 30341",
    "reviews": [
      {
        "text": "Delicious dessert spot. They have a good blend of traditional style desserts as well as nice take American style desserts. I got ice cream and it was...",
        "rating": 5,
        "user": "Key M."
      },
      {
        "text": "I accidentally discovered this super-cool tea-snack shop, located right next door to Tea Top.\n\nTheir menu was super-unique as well. Seemingly a Hong Kong...",
        "rating": 5,
        "user": "Rose E."
      },
      {
        "text": "Fleecy! I'm all about Sweet Spot's fleecy! The mango pomelo one to be exact.\n\nNope, this dreamy dessert doesn't have anything to do with sheep wool or old...",
        "rating": 5,
        "user": "Lisa H."
      }
    ]
  },
  {
    "id": "LKQd5rGpjsoL-FOvfbbdEQ",
    "name": "Where's The Scoop?",
    "address": "9925 Haynes Bridge Rd Ste 510 Johns Creek, GA 30022",
    "reviews": [
      {
        "text": "First timer and my mom & I loved it! Seriously best ice cream I've ever had. Will definitely recommend & their location is really the only one in the area...",
        "rating": 5,
        "user": "Meaghan B."
      },
      {
        "text": "First off this place is like NO other. Parking is easy. It's in a shopping center with spots available near by. \nThe owner, Zack, is a very talented kid. He...",
        "rating": 5,
        "user": "amanda s."
      },
      {
        "text": "Amazing product. Amazing service. 10/10. \n\nThis place has a unique take on gourmet ice cream. I've been here a few times over the last few weeks and ill...",
        "rating": 5,
        "user": "John S."
      }
    ]
  },
  {
    "id": "0RDGOFcgDhzry4MDopu0-A",
    "name": "Jeni's Splendid Ice Creams",
    "address": "800 Avalon Blvd Alpharetta, GA 30009",
    "reviews": [
      {
        "text": "The moment you walk in, the smell of  their waffle cones assaults your nose. It was heaven. I had the milky chocolate and the almond brittle scoop.\n\nThe...",
        "rating": 5,
        "user": "Winnie N."
      },
      {
        "text": "This is one of my favorite ice cream shops in town! They are constantly making new flavors. It's always an adventure on which flavors you actually choose as...",
        "rating": 4,
        "user": "Jen L."
      },
      {
        "text": "If you haven't been to Jeni's it is a place that it is well worth the wait in line.\n\nCreamy ice cream and lots of unusual flavors with some of the original...",
        "rating": 4,
        "user": "Ed W."
      }
    ]
  }
]

let req: any
let res: any
beforeEach(() => {
  req = new Request('/', {
    headers: { authorization: 'Bearer um_token_qualquer' }
  })
  // res = new Response()
  res = new Response()

  jest.clearAllMocks()
})

describe('Happy path', () => {
  it('should return a list of business and statuscode 200', async () => {
    // Arrange
    const yelpMock = mockedYelpBusinessService.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve(yelpData)) } })
    const businessMock = mockedBusinessController.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve(businessData)) } })
    const reviewsMock = mockedBusinessReviewsontroller.mockImplementation(() => { return { getReviews: jest.fn(() => Promise.resolve(reviewsData)) } })
    const businessReviews = new BusinessReviewsService()

    // Act
    await businessReviews.reviews(req, res)

    // Assert
    expect(yelpMock).toHaveBeenCalled()
    expect(yelpMock).toHaveBeenCalledTimes(1)
    expect(businessMock).toHaveBeenCalled()
    expect(businessMock).toHaveBeenCalledTimes(1)
    expect(reviewsMock).toHaveBeenCalled()
    expect(reviewsMock).toHaveBeenCalledTimes(1)
    expect(res.status).toBeCalledWith(OK)
    expect(res.json).toHaveBeenCalled()
    // expect(res.json).toHaveBeenCalledWith(businessData)
  })

  it('should return an empty list of business and statuscode 200', async () => {
    // Arrange
    const yelpMock = mockedYelpBusinessService.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve(yelpData)) } })
    const businessMock = mockedBusinessController.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve(businessData)) } })
    const reviewsMock = mockedBusinessReviewsontroller.mockImplementation(() => { return { getReviews: jest.fn(() => Promise.resolve([])) } })
    const businessReviews = new BusinessReviewsService()

    // Act
    await businessReviews.reviews(req, res)

    // Assert
    expect(yelpMock).toHaveBeenCalled()
    expect(yelpMock).toHaveBeenCalledTimes(1)
    expect(businessMock).toHaveBeenCalled()
    expect(businessMock).toHaveBeenCalledTimes(1)
    expect(reviewsMock).toHaveBeenCalled()
    expect(reviewsMock).toHaveBeenCalledTimes(1)
    expect(res.status).toBeCalledWith(OK)
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith([])
  })
})

describe('Unhappy path', () => {
  it('should throw error if no token was provided', async () => {
    // Arrange
    req.headers = { authorization: '' }
    const businessReviews = new BusinessReviewsService()

    // Act
    await businessReviews.reviews(req, res)

    // Assert
    expect(Error).toBeTruthy()
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith(Error('No token was provided'))
  })

  it(`should return just an ${INTERNAL_SERVER_ERROR}`, async () => {
    // Arrange
    req.headers = { authorization: 'Bearer um_token_qualquer' }
    mockedYelpBusinessService.mockImplementation(() => { return { getBusiness: jest.fn(() => { throw new Error('INTERNAL_SERVER_ERROR') }) } })
    const businessReviews = new BusinessReviewsService()

    // Act
    await businessReviews.reviews(req, res)

    // Assert
    expect(Error).toBeTruthy()
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith(Error('INTERNAL_SERVER_ERROR'))
  })
})