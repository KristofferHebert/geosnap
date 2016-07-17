import express from 'express'

import controller from './controller'

const router = express.Router()

router.post('/upload', controller.upload)
router.get('/example', controller.example)
router.get('/', controller.get)

export default router
