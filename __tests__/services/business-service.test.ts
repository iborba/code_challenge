import axiosApi from '../../src/services/api'
import { mockCodeChallengeBusiness } from '../../__mocks__/code-challenge business'
import { businessService } from '../../src/services/business.service'
import { Response } from 'jest-express/lib/response';
import { Request } from 'jest-express/lib/request'

jest.mock('../../src/services/api')
const axios = axiosApi as jest.Mocked<typeof axiosApi>;

describe('Business service class', () => {
  test('business should be a function', () => {
    // Assert
    expect(businessService.business).toBeInstanceOf(Function)
  })

  // test('business request must have a token', () => {
  //   // Arrange
  //   let req: any
  //   req = new Request('/my/test', {
  //     headers: {
  //       'authorization': ''
  //     }
  //   })

  //   // Assert
  //   expect(businessService.business).toHaveBeenCalledWith(req.headers)
  // })

  // test('should get a list of businesses', async () => {
  //   // Arrange
  //   let req: any
  //   let res: any

  //   req = new Request('/my/test', {
  //     headers: {
  //       'authorization': ''
  //     }
  //   })

  //   res = new Response()



  //   // // axios.get.mockImplementationOnce(() => Promise.resolve({ mockCodeChallengeBusiness }))

  //   // // // Act
  //   // // await businessService.business(req, res)

  //   // // // Assert
  //   // // expect(axios.get).toBeCalledTimes(1)
  //   // // expect(axios.get).toHaveBeenCalledWith(`/businesses/search?location=Alpharetta&categories=icecream&sort_by=rating&limit=5`, { headers: {} })
  // })
})