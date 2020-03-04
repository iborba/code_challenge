import { headerValidator } from '../../src/middlewares/validators/headers'

describe('middleware tests', () => {
  it('should authenticate', () => {
    const req: any = {
      get: jest.fn(_ => 'text/plain'),
      headers: { authorization: 'Bearer Z9a7bHducX5Ht-atLUGO7d9XDvrREn2nRtfOiDnjOVds4DfUC8B4KxnCJDrDQNdP3tcp2ppXg679U0cxpLqmAE1KddQ8Br4jTRAdIGhcNYJk0sKhPMydiAxkQnZZXnYx' }
    }
    const res: any = { status: jest.fn() }
    const next = jest.fn();

    headerValidator(req, res, next)

    expect(next).toBeCalled()
  })
})