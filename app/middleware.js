import express from 'express'
import compression from 'compression'
import config from './config'

const app = express()

app.use(express.static('public'))
app.use(compression())

export default app
