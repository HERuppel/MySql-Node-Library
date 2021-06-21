import { Request, Response } from 'express'
import BookService from '../services/BookService'

interface IBook {
  email: string
  name: string
  author: string
  publisher: string
  year: number
  pages: number
  genre: string
}

class BookController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, name, author, publisher, year, pages, genre }: IBook = req.body

    const bookService = new BookService()

    try {
      const book = await bookService.create({ email, name, author, publisher, year, pages, genre })

      return res.status(200).json(book)
    } catch (e) {
      return res.status(400).json({ messasge: e.message })
    }
  }

  async readAll(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const bookService = new BookService()

    try {
      const books = await bookService.readAll({ email })

      return res.status(200).json(books)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async readBy(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const { filter='' } = req.query

    const bookService = new BookService()

    try {
      const books = await bookService.readBy({ email, filter })

      return res.status(200).json(books)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email, name, author, publisher, genre, year, pages, id } = req.body

    const bookService = new BookService()

    try {
      const book = await bookService.update({ email, name, author, publisher, genre, year, pages, id })

      return res.status(200).json(book)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { email, id } = req.body

    const bookService = new BookService()

    try {
      const book = await bookService.delete({ email, id })

      return res.status(200).json(book)
    } catch (e) {
      return res.status(400).json({ message: e.message })
    }
  }

}

export default BookController