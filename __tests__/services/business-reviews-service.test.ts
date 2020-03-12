import { config as dotEnvConfig } from "dotenv";
import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { BusinessController } from '../../src/controllers/business.controller'
import { BusinessReviewsController } from '../../src/controllers/business-reviews.controller'
import { YelpBusinessService } from '../../src/services/yelp-business-service'


import { BusinessReviewsService } from '../../src/services/business-reviews.service'
import { mockCodeChallengeBusiness } from '../../__mocks__/code-challenge business'
import { mockCodeChallengeReviews } from '../../__mocks__/code-challenge reviews'
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { mockYelpReviews } from '../../__mocks__/yelp reviews'
import { OK } from 'http-status-codes';

dotEnvConfig({
  path: ".env.test"
})

jest.mock('express', () => { require('jest-express') })
jest.mock('../../src/controllers/business.controller')
jest.mock('../../src/controllers/business-reviews.controller')
jest.mock('../../src/services/yelp-business-service')

const mockedBusinessController = <jest.Mock<BusinessController>>BusinessController
const mockedBusinessReviewsController = <jest.Mock<BusinessReviewsController>>BusinessReviewsController
const mockedYelpBusinessService = <jest.Mock<YelpBusinessService>>YelpBusinessService

let req: any
let res: any
let businessReviewsService: BusinessReviewsService

beforeEach(() => {
  businessReviewsService = new BusinessReviewsService()
  req = new Request('/', {
    headers: {
      'authorization': ''
    }
  })

  res = new Response()

  jest.clearAllMocks()
})

describe('Happy Path', () => {
  it('business should be a function', () => {
    expect(businessReviewsService.reviews).toBeInstanceOf(Function)
  })

  it('should return a list or reviews', async () => {
    // Arrange
    mockedYelpBusinessService.mockImplementation(() => {
      return {
        getBusiness: jest.fn(() => Promise.resolve({ businesses: [mockYelpBusinesses] })),
        getBusinessReviews: jest.fn(() => Promise.resolve({
          "reviews": [{
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
          }]
        }))
      }
    })
    mockedBusinessController.mockImplementation(() => {
      return {
        getBusiness: jest.fn(() => Promise.resolve(mockCodeChallengeBusiness))
      }
    })
    mockedBusinessReviewsController.mockImplementation(() => {
      return {
        getReviews: jest.fn(() => Promise.resolve(mockCodeChallengeReviews))
      }
    })

    // Act
    const result = await businessReviewsService.reviews(req, res)
  })
})
