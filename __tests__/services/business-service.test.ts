import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { BusinessService } from '../../src/services/business-service'
import { YelpBusinessService } from '../../src/services/yelp-business-service'
import { BusinessController } from '../../src/controllers/business.controller'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes'

jest.mock('../../src/services/yelp-business-service')
jest.mock('../../src/controllers/business.controller')

const mockedYelpBusinessService = <jest.Mock<YelpBusinessService>>YelpBusinessService
const mockedBusinessController = <jest.Mock<BusinessController>>BusinessController

const yelpData = {
  "businesses": [
    {
      "id": "v21jReWx5dd5KuQ0QS6Dog",
      "alias": "screamn-nuts-alpharetta",
      "name": "Scream'n Nuts",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/-N0_wC4BPcv2yVjhcW4FYg/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
      "review_count": 309,
      "categories": [
        {
          "alias": "donuts",
          "title": "Donuts"
        },
        {
          "alias": "icecream",
          "title": "Ice Cream & Frozen Yogurt"
        },
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 34.049333,
        "longitude": -84.281247
      },
      "transactions": [
        "delivery"
      ],
      "price": "$",
      "location": {
        "address1": "5950 North Point Pkwy",
        "address2": "",
        "address3": null,
        "city": "Alpharetta",
        "zip_code": "30022",
        "country": "US",
        "state": "GA",
        "display_address": [
          "5950 North Point Pkwy",
          "Alpharetta, GA 30022"
        ]
      },
      "phone": "+14044744766",
      "display_phone": "(404) 474-4766",
      "distance": 2264.570336710685
    },
    {
      "id": "s1mE82VEw5GqONY8cdZ_dA",
      "alias": "boba-mocha-duluth",
      "name": "Boba Mocha",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/TswqGx1iOOJTL83QV0lsuQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/boba-mocha-duluth?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
      "review_count": 499,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        },
        {
          "alias": "bubbletea",
          "title": "Bubble Tea"
        },
        {
          "alias": "icecream",
          "title": "Ice Cream & Frozen Yogurt"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 33.9711708777899,
        "longitude": -84.1478902172178
      },
      "transactions": [
        "delivery"
      ],
      "price": "$",
      "location": {
        "address1": "2628 Pleasant Hill Rd",
        "address2": "Ste 100",
        "address3": "",
        "city": "Duluth",
        "zip_code": "30096",
        "country": "US",
        "state": "GA",
        "display_address": [
          "2628 Pleasant Hill Rd",
          "Ste 100",
          "Duluth, GA 30096"
        ]
      },
      "phone": "+16783673757",
      "display_phone": "(678) 367-3757",
      "distance": 16394.449923570268
    }
  ]
}
const businessData = [
  {
    "id": "v21jReWx5dd5KuQ0QS6Dog",
    "name": "Scream'n Nuts",
    "location": "5950 North Point Pkwy Alpharetta, GA 30022"
  },
  {
    "id": "s1mE82VEw5GqONY8cdZ_dA",
    "name": "Boba Mocha",
    "location": "2628 Pleasant Hill Rd Ste 100 Duluth, GA 30096"
  },
  {
    "id": "VdcQMPVIIfsiHU2FUOyDNQ",
    "name": "Sweet Spot",
    "location": "6035 Peachtree Rd Ste A-115 Doraville, GA 30341"
  },
  {
    "id": "LKQd5rGpjsoL-FOvfbbdEQ",
    "name": "Where's The Scoop?",
    "location": "9925 Haynes Bridge Rd Ste 510 Johns Creek, GA 30022"
  },
  {
    "id": "0RDGOFcgDhzry4MDopu0-A",
    "name": "Jeni's Splendid Ice Creams",
    "location": "800 Avalon Blvd Alpharetta, GA 30009"
  }
]

let req: any
let res: any
beforeEach(() => {
  req = new Request('/', {
    headers: { authorization: 'Bearer um_token_qualquer' }
  })
  // res = new Response()
  res = new Response()

  jest.clearAllMocks()
})

describe('Happy path', () => {
  it('should return a list of business and statuscode 200', async () => {
    // Arrange
    const yelpMock = mockedYelpBusinessService.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve(yelpData)) } })
    const businessMock = mockedBusinessController.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve(businessData)) } })
    const businessService = new BusinessService()

    // Act
    await businessService.business(req, res)

    // Assert
    expect(yelpMock).toHaveBeenCalled()
    expect(businessMock).toHaveBeenCalled()
    expect(yelpMock).toHaveBeenCalledTimes(1)
    expect(businessMock).toHaveBeenCalledTimes(1)
    expect(res.status).toBeCalledWith(OK)
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith(businessData)
  })

  it('should return an empty list of business and statuscode 200', async () => {
    // Arrange
    const yelpMock = mockedYelpBusinessService.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve(yelpData)) } })
    const businessMock = mockedBusinessController.mockImplementation(() => { return { getBusiness: jest.fn(() => Promise.resolve([])) } })
    const businessService = new BusinessService()

    // Act
    await businessService.business(req, res)

    // Assert
    expect(yelpMock).toHaveBeenCalled()
    expect(businessMock).toHaveBeenCalled()
    expect(yelpMock).toHaveBeenCalledTimes(1)
    expect(businessMock).toHaveBeenCalledTimes(1)
    expect(res.status).toBeCalledWith(OK)
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith([])
  })
})

describe('Unhappy path', () => {
  it('should throw error if no token was provided', async () => {
    // Arrange
    req.headers = { authorization: '' }
    const businessService = new BusinessService()

    // Act
    await businessService.business(req, res)

    // Assert
    expect(Error).toBeTruthy()
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith(Error('No token was provided'))
  })

  it(`should return just an ${INTERNAL_SERVER_ERROR}`, async () => {
    // Arrange
    req.headers = { authorization: 'Bearer um_token_qualquer' }
    mockedYelpBusinessService.mockImplementation(() => { return { getBusiness: jest.fn(() => { throw new Error('INTERNAL_SERVER_ERROR') }) } })
    const businessService = new BusinessService()

    // Act
    await businessService.business(req, res)

    // Assert
    expect(Error).toBeTruthy()
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR)
    expect(res.json).toHaveBeenCalledWith(Error('INTERNAL_SERVER_ERROR'))
  })
})