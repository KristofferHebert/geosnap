import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'

import config from './config'

const app = express()

app.use(express.static('public'))
app.use(compression())
app.use(bodyParser.json())

app.set('secret', config.secret)

export default app
