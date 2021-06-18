import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

interface TokenPayload {
  id: string
}

const ensureAuth = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.json({ message: 'Missing JWT Token' })

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { id } = decoded as TokenPayload 

    if (!id) return res.json({ message: 'Invalid Permission' })


    return next()
  } catch (e) {
    return res.json({ message: e })
  }
}

export default ensureAuth