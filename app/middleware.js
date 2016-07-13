import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import config from './config'

const app = express()

app.use(express.static('public'))
app.use(compression())
app.use(bodyParser.json())

app.set('secret', config.secret)

// Setup DB Connection
mongoose.connect('mongodb://localhost/' + config.database)

export default app
