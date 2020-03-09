import { yelpBusinessService } from '../../src/services/yelp-business-service'

jest.mock('../../src/services/yelp-business-service')
const mocked = yelpBusinessService as jest.Mocked<typeof yelpBusinessService>;

describe('business controller class', () => {
  it('not shall pass', () => {
    expect(10).not.toEqual(20)
  })
})