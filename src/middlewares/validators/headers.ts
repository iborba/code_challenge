import { Request, Response, NextFunction } from 'express'
import { error_no_token_provided } from '../../../src/config/messages'
import { BAD_REQUEST } from 'http-status-codes'

export const headerValidator = (req: Request, res: Response, next: NextFunction) => {
  return req.headers.authorization
    ? next()
    : res.status(BAD_REQUEST).json({ message: error_no_token_provided })
}