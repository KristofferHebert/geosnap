import express from 'express'
import path from 'path'

import SnapRouter from './snap/router'
import UserRouter from './user/router'

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'))
})

app.use('/snap', SnapRouter)
app.use('/user', UserRouter)

export default app
