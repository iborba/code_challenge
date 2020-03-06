import { Response } from 'jest-express/lib/response';
import { Request } from 'jest-express/lib/request'
import { loggerMiddleware } from '../../src/middlewares/loggerMiddleware'

describe('loggerMiddleware', () => {
  let req: any
  let res: any
  let next: any

  req = new Request('/my/test', {
    headers: {
      'authorization': ''
    }
  })

  res = new Response()
  next = jest.fn();

  test('should get a log message', (done) => {
    loggerMiddleware(req, res, next)

    expect(next).toHaveBeenCalled()
    done()
  })
})