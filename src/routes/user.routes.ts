import { Router } from 'express'
import UserController from '../controllers/UserController'
import ensureAuth from '../middlewares/ensureAuth'

const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/register', userController.create)
userRoutes.post('/signin', userController.signin)
userRoutes.put('/update', ensureAuth, userController.update)

export default userRoutes 