import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { businessService } from '../../src/services/business.service'
import { yelpBusinessService } from '../../src/services/yelp-business-service'
import { businessController } from '../../src/controllers/business.controller'
import { mockCodeChallengeBusiness } from '../../__mocks__/code-challenge business'
import { config as dotEnvConfig } from "dotenv";
import { OK } from 'http-status-codes';

dotEnvConfig({
  path: ".env.test"
})

// jest.mock('express', () => { require('jest-express') })
jest.mock('../../src/services/yelp-business-service')
jest.mock('../../src/controllers/business.controller')
const yelpService = yelpBusinessService as jest.Mocked<typeof yelpBusinessService>;
const businessCtrl = businessController as jest.Mocked<typeof businessController>;

describe('Business service class', () => {
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
    expect(businessService.business).toBeInstanceOf(Function)
  })

  test('should get a list of businesses', async () => {
    // Arrange
    yelpService.getBusiness.mockImplementationOnce(() => Promise.resolve({ businesses: [mockYelpBusinesses] }))
    businessCtrl.getBusiness.mockImplementationOnce(() => Promise.resolve(mockCodeChallengeBusiness))

    // Act
    await businessService.business(req, res)

    // Assert
    expect(yelpService.getBusiness).toHaveBeenCalledTimes(1)
    expect(businessCtrl.getBusiness).toHaveBeenCalledTimes(1)
    expect(res.status).toBeCalledWith(OK)
    expect(res.json).not.toBeNull()
  })

  test('should catch an error', async () => {
    // Arrange
    businessCtrl.getBusiness.mockImplementationOnce(() => { throw new Error('Type mismatch') })

    // Act
    await businessService.business(req, res)

    // Assert
    expect(yelpService.getBusiness).toBeCalled()
    expect(yelpService.getBusiness).toBeCalledTimes(1)
    expect(businessCtrl.getBusiness).toBeCalled()
    expect(businessCtrl.getBusiness).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(Error('Type mismatch'))

  })
})