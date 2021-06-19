import { Router } from 'express'
import ensureAuth from '../middlewares/ensureAuth'

import BookController from '../controllers/BookController'

const bookRoutes = Router()

const bookController = new BookController()

bookRoutes.post('/register', ensureAuth, bookController.create)
bookRoutes.get('/readall', ensureAuth, bookController.readAll)
bookRoutes.get('/readby', ensureAuth, bookController.readBy)

export default bookRoutes 