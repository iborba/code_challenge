import { axiosApi } from '../../src/services/api'
import { YelpReviewService } from '../../src/services/yelp-review-service'
import { IncomingHttpHeaders } from 'http';
import { error_no_token_provided, error_one_or_more_params_invalid } from '../../src/config/messages'

jest.mock('../../src/services/api')
const axios = axiosApi as jest.Mocked<typeof axiosApi>;

let targetTest = new YelpReviewService()
const data = [
  {
    "id": "jb8X0WoJYoADYfwuWDtbvg",
    "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&hrid=jb8X0WoJYoADYfwuWDtbvg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
    "text": "Delicious gourmet donuts!  Highly Recommend! \nBread donut pudding and delicious homemade ice cream! Yum! \n\nUnbelievable customer service! They made fresh...",
    "rating": 5,
    "time_created": "2020-02-06 17:31:44",
    "user": {
      "id": "OEYkt2w7kWoINuKRRyLfRA",
      "profile_url": "https://www.yelp.com/user_details?userid=OEYkt2w7kWoINuKRRyLfRA",
      "image_url": "https://s3-media3.fl.yelpcdn.com/photo/JJHsJgjjL_NeVdw3LmZ7Cg/o.jpg",
      "name": "Stacey S."
    }
  },
  {
    "id": "MlJ7yDaLpo8fYgnfpNMgCw",
    "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&hrid=MlJ7yDaLpo8fYgnfpNMgCw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
    "text": "I will start with the good - coffee was great ! People\nAt counter were helpful and patient. They had to be patient because Yelp indicated they had frozen...",
    "rating": 2,
    "time_created": "2020-02-10 09:42:13",
    "user": {
      "id": "lqKwbeCeKBGzR0UF548mmQ",
      "profile_url": "https://www.yelp.com/user_details?userid=lqKwbeCeKBGzR0UF548mmQ",
      "image_url": "https://s3-media3.fl.yelpcdn.com/photo/jKxLhsksXKC6HNh6jhEn3A/o.jpg",
      "name": "Cindi P."
    }
  },
  {
    "id": "FOyvfqvGMUAlHdaoCe1DLQ",
    "url": "https://www.yelp.com/biz/screamn-nuts-alpharetta?adjust_creative=Sd7Q-EFGq8tkNAIV5MiAtg&hrid=FOyvfqvGMUAlHdaoCe1DLQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=Sd7Q-EFGq8tkNAIV5MiAtg",
    "text": "I can't even begin to tell you how much we love this place and Natasha (owner). First, she is so community focused and helps out in so many fundraisers and...",
    "rating": 5,
    "time_created": "2020-01-11 15:54:05",
    "user": {
      "id": "tY5bdLE8v8-ZZZrWDqHWLw",
      "profile_url": "https://www.yelp.com/user_details?userid=tY5bdLE8v8-ZZZrWDqHWLw",
      "image_url": "https://s3-media2.fl.yelpcdn.com/photo/_4u4JCqgmC9sLzHEXpXZGQ/o.jpg",
      "name": "Adam W."
    }
  }
]

beforeEach(() => {
  jest.clearAllMocks()
  targetTest = new YelpReviewService()
})

describe('Happy path', () => {
  it('should return a list of reviews', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => Promise.resolve(data))
    const headers: IncomingHttpHeaders = { authorization: 'Bearer um_token_qualquer' }
    const businessId = 'v21jReWx5dd5KuQ0QS6Dog'

    // Act
    const result = await targetTest.getBusinessReviews(businessId, headers)

    // Assert
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/${businessId}/reviews`, { headers })
    // expect(result).toEqual(data)
    expect(typeof result).toEqual('object')
  })
})

describe('Unhappy path', () => {
  it('should not request data if no token was provided', async () => {
    // Arrange
    const headers: IncomingHttpHeaders = { authorization: '' }
    const businessId = 'v21jReWx5dd5KuQ0QS6Dog'

    // Act
    const result = await targetTest.getBusinessReviews(businessId, headers)

    // Assert
    expect(axios.get).not.toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(0)
    expect(Error).toBeTruthy()
    expect(result.message).toEqual(error_no_token_provided)
  })

  it('should not request data if no ID was provided', async () => {
    // Arrange
    const headers: IncomingHttpHeaders = { authorization: 'Bearer um_token_qualquer' }
    const businessId = ''

    // Act
    const result = await targetTest.getBusinessReviews(businessId, headers)

    // Assert
    expect(axios.get).not.toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(0)
    expect(Error).toBeTruthy()
    expect(result.message).toEqual(error_one_or_more_params_invalid)
  })

  it('should return an empty list of reviews', async () => {
    // Arrange
    axios.get.mockImplementationOnce(() => Promise.resolve([]))
    const headers: IncomingHttpHeaders = { authorization: 'Bearer um_token_qualquer' }
    const businessId = 'v21jReWx5dd5KuQ0QS6Dog'

    // Act
    const result = await targetTest.getBusinessReviews(businessId, headers)

    // Assert
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(`/businesses/${businessId}/reviews`, { headers })
    // expect(result).toEqual([])
    expect(typeof result).toEqual('object')
  })
})