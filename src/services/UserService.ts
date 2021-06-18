import { getRepository, Repository } from 'typeorm'
import { compare, hash } from 'bcryptjs'
import User from '../models/User'
import authConfig from '../config/auth'
import { sign } from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

interface IRequest {
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

interface IResponse {
  user: User
  token: string
}

class UserService {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getRepository(User)
  }

  async create({ username, email, age, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      email
    })

    if (userExists) throw new Error('User already exists')

    const hashPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      email,
      username,
      age,
      password: hashPassword
    })

    await this.usersRepository.save(user)

    return user
  }

  async signin({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findOne({
      email
    })

    if (!userExists) throw new Error('User does not exist') 

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) throw new Error('Incorrect password')

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ id: userExists.id }, secret, {
      subject: userExists.id,
      expiresIn,
    })

    return { user: userExists, token }
  }

  async update({ email, username = '', age = 0 }: IUpdate): Promise<IResponse> {
    const userExists = await this.usersRepository.findOne({
      email
    })

    if (!userExists) throw new Error('User does not exist')

    userExists.username = username !== '' ? username : userExists.username
    userExists.age = age !== 0 ? age : userExists.age

    await this.usersRepository.save(userExists)

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ id: userExists.id }, secret, {
      subject: userExists.id,
      expiresIn,
    })

    return { user: userExists, token}
  }
}

export default UserService