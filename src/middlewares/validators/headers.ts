import { Request, Response, NextFunction } from 'express'

const headerValidator = (req: Request, res: Response, next: NextFunction) => {
  return req.headers.authorization
    ? next()
    : res.status(500).json({ message: 'Token not supplied' })
}

export { headerValidator }