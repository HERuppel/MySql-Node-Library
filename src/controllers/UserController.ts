import { Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { username, email, age, password } = req.body

    const userService = new UserService()

    try {
      const user = await userService.create({ username, age, email, password })
  
      return res.status(200).json(user)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async signin(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const userService = new UserService()

    try {
      const user = await userService.signin({ email, password })

      return res.status(200).json(user)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email , username = '', age = 0 } = req.body

    const userService = new UserService()

    try {
      const user = await userService.update({ email, username, age })

      return res.status(200).json(user)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const userService = new UserService()

    try {
      await userService.delete({ email, password })

      return res.status(200).json({ message:  `User ${email} deleted!` })
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }
}

export default UserController
