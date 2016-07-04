'use strict'

import express from 'express'

import config from './config'
import middleware from './middleware'
import routes from './api/routes'

const app = express()

app.use(middleware)
app.use(routes)

app.listen(config.port, () => {
  console.log('Server listening on port ', config.port)
})

export default app
