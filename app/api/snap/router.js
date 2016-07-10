import express from 'express'

import controller from './controller'

const router = express.Router()

router.post('/upload', controller.upload)

export default router
