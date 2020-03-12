import { axiosApi } from '../../src/services/api'
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { mockYelpReviews } from '../../__mocks__/yelp reviews'
import { YelpBusinessService } from '../../src/services/yelp-business-service'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
jest.mock('../../src/services/api')
const axios = axiosApi as jest.Mocked<typeof axiosApi>;

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Happy Path', () => {
  const yelpBusinessService = new YelpBusinessService()

  it('should get a list of businesses', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockYelpBusinesses }))

    // Act
    const result = await yelpBusinessService.getBusiness({})

    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: {} })
    expect(typeof result).toBe('object')
    expect(typeof result.businesses).toBe('object')
    expect(result.businesses.length).toBeGreaterThan(0)
    result.businesses.map(r => {
      expect(r).toHaveProperty('id', 'v21jReWx5dd5KuQ0QS6Dog')
    })
  })

  it('should get an empty list of businesses', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: undefined }))

    // Act
    const result = await yelpBusinessService.getBusiness({})
    console.log(result)
    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: {} })
    expect(typeof result).toBe('object')
    expect(typeof result.businesses).toBe('object')
    expect(result.businesses.length).toBeGreaterThan(1)
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