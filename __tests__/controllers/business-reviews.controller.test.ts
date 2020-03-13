import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { BusinessReviewsController } from '../../src/controllers/business-reviews-controller'
import { YelpReviewService } from '../../src/services/yelp-review-service'
jest.mock('../../src/services/yelp-review-service')

const mocked = <jest.Mock<YelpReviewService>>YelpReviewService

const data = [
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

const yelpData = {
  "reviews": [
    {
      "id": "jb8X0WoJYoADYfwuWDtbvg",
      "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&hrid=jb8X0WoJYoADYfwuWDtbvg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
      "text": "Delicious gourmet donuts!  Highly Recommend! \nBread donut pudding and delicious homemade ice cream! Yum! \n\nUnbelievable customer service! They made fresh...",
      "rating": 5,
      "time_created": "2020-02-06 17:31:44",
      "user": {
        "id": "OEYkt2w7kWoINuKRRyLfRA",
        "profile_url": "https://www.yelp.com/user_details?userid=OEYkt2w7kWoINuKRRyLfRA",
        "image_url": "https://s3-media3.fl.yelpcdn.com/photo/JJHsJgjjL_NeVdw3LmZ7Cg/o.jpg",
        "name": "Stacey S."
      }
    },
    {
      "id": "MlJ7yDaLpo8fYgnfpNMgCw",
      "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&hrid=MlJ7yDaLpo8fYgnfpNMgCw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
      "text": "I will start with the good - coffee was great ! People\nAt counter were helpful and patient. They had to be patient because Yelp indicated they had frozen...",
      "rating": 2,
      "time_created": "2020-02-10 09:42:13",
      "user": {
        "id": "lqKwbeCeKBGzR0UF548mmQ",
        "profile_url": "https://www.yelp.com/user_details?userid=lqKwbeCeKBGzR0UF548mmQ",
        "image_url": "https://s3-media3.fl.yelpcdn.com/photo/jKxLhsksXKC6HNh6jhEn3A/o.jpg",
        "name": "Cindi P."
      }
    },
    {
      "id": "FOyvfqvGMUAlHdaoCe1DLQ",
      "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&hrid=FOyvfqvGMUAlHdaoCe1DLQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
      "text": "I can't even begin to tell you how much we love this place and Natasha (owner). First, she is so community focused and helps out in so many fundraisers and...",
      "rating": 5,
      "time_created": "2020-01-11 15:54:05",
      "user": {
        "id": "tY5bdLE8v8-ZZZrWDqHWLw",
        "profile_url": "https://www.yelp.com/user_details?userid=tY5bdLE8v8-ZZZrWDqHWLw",
        "image_url": "https://s3-media2.fl.yelpcdn.com/photo/_4u4JCqgmC9sLzHEXpXZGQ/o.jpg",
        "name": "Adam W."
      }
    }
  ],
  "total": 311,
  "possible_languages": [
    "en"
  ]
}

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
  it('should return a list of resumed business reviews', async () => {
    // Arrange
    req.headers = { authorization: 'Bearer um_token_qualquer' }
    const yelpMock = mocked.mockImplementation(() => { return { getBusinessReviews: jest.fn(() => Promise.resolve(yelpData.reviews)) } })
    const businessReviewsController = new BusinessReviewsController()

    // Act
    const result = await businessReviewsController.getReviews(data, req)

    // Assert
    expect(yelpMock).toHaveBeenCalled()
    expect(yelpMock).toHaveBeenCalledTimes(1)
    expect(result).not.toBeNull()
    expect(typeof result).toEqual('object')
    expect(result.length).toBeGreaterThan(0)
    result.map(b => {
      expect(b).toHaveProperty(['id'])
      expect(b).toHaveProperty(['name'])
      expect(b).toHaveProperty(['address'])
      expect(b).toHaveProperty(['reviews'])
    })
  })
})

describe('Unhappy path', () => {
  it('should return an error', async () => {
    // Arrange
    req.headers = { authorization: 'Bearer um_token_qualquer' }
    const yelpMock = mocked.mockImplementation(() => { throw new Error('error') })
    const businessReviewsController = new BusinessReviewsController()

    // Act
    const result = await businessReviewsController.getReviews(data, req)
    
    // Assert
    expect(yelpMock).toHaveBeenCalled()
    expect(yelpMock).toHaveBeenCalledTimes(1)
    expect(result).not.toBeNull()
    expect(Error).toBeTruthy()
  })
})