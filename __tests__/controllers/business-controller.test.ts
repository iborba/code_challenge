import { BusinessController } from '../../src/controllers/business.controller'
import { mockYelpBusinesses } from '../../__mocks__/yelp business'


let businessController: BusinessController
beforeEach(() => {
  businessController = new BusinessController()
})

describe('Happy path', () => {
  it('must be a valid request', async () => {
    // Arrange
    const input = { businesses: [mockYelpBusinesses] }
    
    // Act
    const result = await businessController.getBusiness(input)

    // Assert
    expect(typeof input).toBe('object')
    expect(result.length).toBeGreaterThan(0)

    result.map(r => {
      expect(r.id).not.toBeNull()
      expect(r.name.length).toBeGreaterThan(3)
      expect(r.location).toContain(', ')
    })
  })
})

describe('Unhappy path', () => {
  it('must be an invalid request', async () => {
    // Arrange
    const input = { businesses: [] }

    // Act
    const result = await businessController.getBusiness(input)

    // Assert
    expect(result.length).toEqual(0)
  })
})