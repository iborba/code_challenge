import { AppController } from './app'
const port = process.env.PORT || 3333
const app = new AppController().express

app.listen(port, () => {
  console.log(`Server listening at ${port}`)
})
