import axiosApi from '../../src/services/api'
import { mockYelpBusinesses } from '../../__mocks__/yelp business'
import { yelpBusinessService } from '../../src/services/yelp-business-service'

jest.mock('../../src/services/api')
const axios = axiosApi as jest.Mocked<typeof axiosApi>;

describe('Yelp Business service class', () => {
  it('should get a list of businesses', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockYelpBusinesses }))

    // Act
    await yelpBusinessService.getBusiness({})

    // Assert
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: {} })
  })
})