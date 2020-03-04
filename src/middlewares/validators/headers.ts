import { Request, Response, NextFunction } from 'express'
import { BAD_REQUEST } from 'http-status-codes'

const headerValidator = (req: Request, res: Response, next: NextFunction) => {
  return req.headers.authorization
    ? next()
    : res.status(BAD_REQUEST).json({ message: 'Token not supplied' })
}

export { headerValidator }