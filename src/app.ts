import * as express from 'express'
import * as cors from 'cors'
import { routes } from './routes'
import { config as dotEnvConfig } from "dotenv";
import { loggerMiddleware } from './middlewares/loggerMiddleware'

dotEnvConfig({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

export class AppController {
  express = express()

  middlewares() {
    this.express.use(cors())
    this.express.use(loggerMiddleware)
    this.express.use(express.json())
  }

  routes() {
    this.express.use('/api', routes)
  }

  start() {
    this.middlewares()
    this.routes()
  }
}