import { axiosApi } from '../../src/services/api'
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { mockYelpReviews } from '../../__mocks__/yelp reviews'
import { YelpBusinessService } from '../../src/services/yelp-business-service'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
jest.mock('../../src/services/api')
const axios = axiosApi as jest.Mocked<typeof axiosApi>;

describe('Yelp Business service class', () => {
  const yelpBusinessService = new YelpBusinessService()
  
  test('getBusiness should be a function', () => {
    // Assert
    expect(yelpBusinessService.getBusiness).toBeInstanceOf(Function)
  })

  test('should get a list of businesses', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockYelpBusinesses }))

    // Act
    const result = await yelpBusinessService.getBusiness({})

    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: {} })
    expect(result).toHaveProperty('id', 'v21jReWx5dd5KuQ0QS6Dog')
  })

  test('should return an error', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => { throw new Error(INTERNAL_SERVER_ERROR.toString()) })

    // Act
    const t = await yelpBusinessService.getBusiness({})

    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(t).toEqual(Error(INTERNAL_SERVER_ERROR.toString()))
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

  test('should return an error', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => { throw new Error(INTERNAL_SERVER_ERROR.toString()) })

    // Act
    const result = await yelpBusinessService.getBusinessReviews('-1', {})

    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(result).toEqual(Error(INTERNAL_SERVER_ERROR.toString()))
  })
})