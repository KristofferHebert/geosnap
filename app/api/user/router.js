import express from 'express'

import controller from './controller'

const router = express.Router()

router.auth('/upload', controller.auth)

export default router
