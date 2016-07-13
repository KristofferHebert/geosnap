import express from 'express'

import controller from './controller'

const router = express.Router()

router.post('/auth', controller.auth)
router.post('/', controller.post)

export default router
