import axiosApi from '../../src/services/api'
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { mockYelpReviews } from '../../__mocks__/yelp reviews'
import { yelpBusinessService } from '../../src/services/yelp-business-service'

jest.mock('../../src/services/api')
const axios = axiosApi as jest.Mocked<typeof axiosApi>;

// yelpBusinessService['follmann']

describe('Yelp Business service class', () => {
  test('getBusiness should be a function', () => {
    // Assert
    expect(yelpBusinessService.getBusiness).toBeInstanceOf(Function)
  })

  test('should get a list of businesses', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockYelpBusinesses }))

    // Act
    await yelpBusinessService.getBusiness({})

    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: {} })
  })

  test('should get a list of business reviews', async () => {
    // Arrange
    const businessId = 'v21jReWx5dd5KuQ0QS6Dog'
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockYelpReviews }))

    // Act
    const result = await yelpBusinessService.getBusinessReviews(businessId, {})

    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/${businessId}/reviews`, { headers: {} })
    expect(result.reviews.length).toBeGreaterThan(0)
  })
})