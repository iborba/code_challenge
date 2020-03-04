import * as request from 'supertest'
import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes'
import { app } from '../../src/app'

describe('business', () => {
  it('should return Token not supplied', async (done) => {
    const res = await request(app)
      .get('/api/business')
    const message = JSON.parse(res.text).message
    expect(res.status).toEqual(BAD_REQUEST)

    expect(message).toEqual('Token not supplied')

    done()
  })

  it('should return a list of business', async (done) => {
    const res = await request(app)
      .get('/api/business')
      .auth('Z9a7bHducX5Ht-atLUGO7d9XDvrREn2nRtfOiDnjOVds4DfUC8B4KxnCJDrDQNdP3tcp2ppXg679U0cxpLqmAE1KddQ8Br4jTRAdIGhcNYJk0sKhPMydiAxkQnZZXnYx', { type: 'bearer' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      
    expect(res.status).toEqual(OK)

    done()
  })
})