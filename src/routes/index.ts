import { Router } from 'express'

import userRouter from './user.routes'
import bookRouter from './book.routes'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/book', bookRouter)

export default routes
