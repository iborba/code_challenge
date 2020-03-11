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
        getBusinessReviews: jest.fn(() => Promise.resolve(undefined))
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

    console.log(result)
  })
})
