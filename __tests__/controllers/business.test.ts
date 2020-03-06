import { businessController } from '../../src/controllers/business'
import { mocked } from "ts-jest/dist/util/testing";
import { businessData } from '../../__mocks__/business-top-5'
jest.mock('../../src/controllers/business')

describe('businessController tests', () => {
  mocked(businessController.externalGetBusiness).mockResolvedValue(businessData)
  // mocked(businessController.externalGetBusinessReviews).mockResolvedValue(data)

  // TOOD
  // create a class to get data from external APIs
  // everything else  

  it('should return an external list of businesses', async () => {
    const response = await businessController.externalGetBusiness()

    expect(response).not.toBeNull()
    expect(response.status).toEqual(200)
    expect(response.data.businesses.length).toBeGreaterThan(0)
    expect(response).toEqual(businessData)
  })
})