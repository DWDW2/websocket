import express from 'express'
import protectRoute from '../middleware/protectedRoute.middleware.js'
import { getUsersForSideBar } from '../controllers/user.controllers.js'
const router = express.Router()

router.get('/Users', protectRoute, getUsersForSideBar)

export default router