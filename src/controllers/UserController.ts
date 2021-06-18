import { Request, Response } from 'express'
import UserService from '../services/UserService'

interface IUser {
  username?: string
  email: string
  age?: number
  password: string
}

interface IUpdate {
  username?: string
  age?: number
  email: string
}

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { username, email, age, password }: IUser = req.body

    const userService = new UserService()

    try {
      const user = await userService.create({ username, age, email, password })
  
      return res.json(user)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async signin(req: Request, res: Response): Promise<Response> {
    const { email, password }: IUser = req.body

    const userService = new UserService()

    try {
      const user = await userService.signin({ email, password })

      return res.json(user)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email , username = '', age = 0 }: IUpdate= req.body

    const userService = new UserService()

    try {
      const user = await userService.update({ email, username, age })

      return res.json(user)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }
}

export default UserController
