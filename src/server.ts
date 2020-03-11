import { AppController } from './app'
const port = process.env.PORT || 3333
const app = new AppController()

app.start()

app.express.listen(port, () => {
  console.log(`Server listening at ${port}`)
})
