import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { BusinessService } from '../../src/services/business.service'
import { YelpBusinessService } from '../../src/services/yelp-business-service'
import { BusinessController } from '../../src/controllers/business.controller'
import { mockCodeChallengeBusiness } from '../../__mocks__/code-challenge business'
import { config as dotEnvConfig } from "dotenv";
import { OK } from 'http-status-codes';

dotEnvConfig({
  path: ".env.test"
})

// jest.mock('express', () => { require('jest-express') })
jest.mock('../../src/services/yelp-business-service')
jest.mock('../../src/controllers/business.controller')
// const yelpService = YelpBusinessService as jest.Mocked<typeof YelpBusinessService>;
// const businessCtrl = BusinessController as jest.Mocked<typeof BusinessController>;
const yelpService = <jest.Mock<YelpBusinessService>>YelpBusinessService
const businessCtrl = <jest.Mock<BusinessController>>BusinessController
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

describe('Happy path', () => {
  const businessService = new BusinessService()
  test('business should be a function', () => {
    expect(businessService.business).toBeInstanceOf(Function)
  })

  test('should get a list of businesses', async () => {
    // Arrange
    yelpService.prototype.getBusiness.mockImplementationOnce(() => Promise.resolve({ businesses: [mockYelpBusinesses] }))
    businessCtrl.prototype.getBusiness.mockImplementationOnce(() => Promise.resolve(mockCodeChallengeBusiness))

    // Act
    await businessService.business(req, res)

    // Assert
    expect(yelpService.prototype.getBusiness).toHaveBeenCalledTimes(1)
    expect(businessCtrl.prototype.getBusiness).toHaveBeenCalledTimes(1)
    expect(res.status).toBeCalledWith(OK)
    expect(res.json).not.toBeNull()
  })

})

describe('Unhappy path', () => {
  test('should catch an error', async () => {
    // Arrange
    businessCtrl.prototype.getBusiness.mockImplementationOnce(() => { throw new Error('Type mismatch') })
    const businessService = new BusinessService()
    // Act
    await businessService.business(req, res)

    // Assert
    expect(yelpService.prototype.getBusiness).toBeCalled()
    expect(yelpService.prototype.getBusiness).toBeCalledTimes(1)
    expect(businessCtrl.prototype.getBusiness).toBeCalled()
    expect(businessCtrl.prototype.getBusiness).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(Error('Type mismatch'))
  })
})