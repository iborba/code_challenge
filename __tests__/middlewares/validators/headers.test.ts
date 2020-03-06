import { Request } from 'jest-express/lib/request'
import { Response } from 'jest-express/lib/response';
import { headerValidator } from '../../../src/middlewares/validators/headers'
import { BAD_REQUEST } from 'http-status-codes'
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig({
  path: ".env.test"
})

jest.mock('express', () => { require('jest-express') })

describe('headerValidator middleware', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = new Request('/', {
      headers: {
        'authorization': ''
      }
    })

    res = new Response()
  })

  test('should return bad request if not provided token', (done) => {
    // Arrange
    const next = jest.fn();

    // Act
    headerValidator(req, res, next)

    // Assert
    expect(res.status).toBeCalledWith(BAD_REQUEST)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token not supplied' })
    expect(next).not.toHaveBeenCalled()

    done()
  })

  test('should grant acces if any token provided', (done) => {
    // Arrange
    req.headers = {
      'authorization': 'TOKEN'
    }
    const next = jest.fn();

    // Act
    headerValidator(req, res, next)

    // Assert
    expect(next).toHaveBeenCalled()

    done()
  })
})