import * as express from 'express'
import * as cors from 'cors'
import { Routes } from './routes'
import { config as dotEnvConfig } from "dotenv";
import { loggerMiddleware } from './middlewares/loggerMiddleware'

dotEnvConfig({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

export class AppController {
  express: any

  constructor() {
    this.express = express()
  }

  middlewares() {
    this.express.use(cors())
    this.express.use(loggerMiddleware)
    this.express.use(express.json())
  }

  routes() {
    this.express.use('/api', new Routes().routes)
  }

  start() {
    this.middlewares()
    this.routes()
  }
}