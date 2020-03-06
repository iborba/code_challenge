import { businessData as businessTop5Data } from '../../__mocks__/business-top-5'
import { data as businessData } from '../../__mocks__/business'
import { yelpBusinessService } from '../../src/services/yelp-business-service'
import { businessController } from '../../src/controllers/business'

jest.mock('../../src/services/yelp-business-service')
const mocked = yelpBusinessService as jest.Mocked<typeof yelpBusinessService>;

describe('business controller class', () => {
  it('should get a list of businesses', async () => {
    // Arrange
    mocked.getBusiness.mockImplementationOnce(() => Promise.resolve(businessTop5Data))

    // Act
    const result = await businessController.getBusiness()

    // Assert
    expect(mocked.getBusiness).toBeCalledTimes(1)
    expect(result).not.toBeNull()
    expect(result).toEqual(businessData)
  })
})