import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { yelpBusinessService } from '../../src/services/yelp-business-service'
import { BusinessReviewsService } from '../../src/services/business-reviews.service'
import { businessController } from '../../src/controllers/business.controller'
import { businessReviewsController } from '../../src/controllers/business-reviews.controller'
import { mockCodeChallengeBusiness } from '../../__mocks__/code-challenge business'
import { mockCodeChallengeReviews } from '../../__mocks__/code-challenge reviews'
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { config as dotEnvConfig } from "dotenv";
import { OK } from 'http-status-codes';

dotEnvConfig({
  path: ".env.test"
})

jest.mock('express', () => { require('jest-express') })
jest.mock('../../src/services/yelp-business-service')
jest.mock('../../src/controllers/business.controller')
jest.mock('../../src/controllers/business-reviews.controller')

const yelpService = yelpBusinessService as jest.Mocked<typeof yelpBusinessService>;
const businessCtrl = businessController as jest.Mocked<typeof businessController>;
const reviewsController = businessReviewsController as jest.Mocked<typeof businessReviewsController>;

describe('Happy Path', () => {
  const businessReviewsService = new BusinessReviewsService()
  let req: any
  let res: any

  beforeEach(() => {
    req = new Request('/', {
      headers: {
        'authorization': ''
      }
    })

    res = new Response()

    jest.clearAllMocks()
  })

  test('business should be a function', () => {
    expect(businessReviewsService.reviews).toBeInstanceOf(Function)
  })

  // test('should get a list of reviews of a business', async () => {
  //   // Arrange
  //   yelpService.getBusiness.mockImplementationOnce(() => Promise.resolve({ businesses: [mockYelpBusinesses] }))
  //   businessCtrl.getBusiness.mockImplementationOnce(() => Promise.resolve(mockCodeChallengeBusiness))
  //   reviewsController.getReviews.mockImplementationOnce(() => Promise.resolve(mockCodeChallengeReviews))

  //   // Act
  //   const result = await businessReviewsService.reviews(req, res)

  //   console.log(result)
  //   // Assert
  //   expect(yelpService.getBusiness).toHaveBeenCalledTimes(1)
  //   expect(businessCtrl.getBusiness).toHaveBeenCalledTimes(1)
  //   expect(reviewsController.getReviews).toHaveBeenCalledTimes(1)
  //   expect(res.status).toBeCalledWith(OK)
  //   expect(res.json).not.toBeNull()
  //   expect(result).toHaveProperty('id', 'v21jReWx5dd5KuQ0QS6Dog')
  // })
})

describe('Unhappy Path', () => {

})