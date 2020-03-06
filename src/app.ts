import * as express from 'express'
import * as cors from 'cors'
import { routes } from './routes'
import { config as dotEnvConfig } from "dotenv";
import { loggerMiddleware } from './middlewares/loggerMiddleware'

dotEnvConfig({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

class AppController {
  express = express()
  constructor() {
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(cors())
    this.express.use(loggerMiddleware)
    this.express.use(express.json())
    this.express.use(loggerMiddleware)
  }
  
  routes() {
    this.express.use('/api', routes)
  }
}

const app = new AppController().express
export { app }