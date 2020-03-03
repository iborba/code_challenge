import * as express from 'express'
import * as cors from 'cors'
import { routes } from './routes'
import { config as dotEnvConfig } from "dotenv";
import { loggerMiddleware } from './middlewares/loggerMiddleware'
dotEnvConfig()

const server = express()

server.use(loggerMiddleware)
server.use(cors())
server.use(express.json())

server.use('/api', routes)

const port = process.env.PORT || 3333

server.listen(port, () => {
  console.log(`Server listening at ${port}`)
})