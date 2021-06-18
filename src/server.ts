import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
dotenv.config()

import './database'

const app = express()

app.use(express.json())

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`)
})
