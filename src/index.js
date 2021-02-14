
const express = require('express')
require('./config/dotenv')

const router = require('./config/routes')

const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.APP_PORT, () => {
  console.log(`App is listening on port ${process.env.APP_PORT}!`)
})
