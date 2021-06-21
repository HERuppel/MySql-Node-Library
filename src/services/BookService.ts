import { DeleteResult, getRepository, Like, Repository } from 'typeorm'
import Book from '../models/Book'
import User from '../models/User'

interface IRequest {
  email: string
  name?: string
  author?: string
  publisher?: string
  year?: number
  pages?: number
  genre?: string
  user_id?: string
  filter?: string | unknown
  id?: string
}

class BookService {
  private bookRepository: Repository<Book>
  private userRepository: Repository<User>

  constructor () {
    this.bookRepository = getRepository(Book)
    this.userRepository = getRepository(User)
  }

  async create ({ email, name, author, pages, publisher, genre, year }: IRequest): Promise<Book> {
    const userExists = await this.userRepository.findOne({ email })

    if (!userExists) throw new Error('User does not exist')


    const book = this.bookRepository.create({
      name,
      author,
      publisher,
      year,
      genre,
      pages,
      user_id: userExists
    })

    await this.bookRepository.save(book)

    return book
  }

  async readAll ({ email }: IRequest): Promise<Book[]> {
    const userExists = await this.userRepository.findOne({ email })

    if (!userExists) throw new Error ('User does not exist')

    const books = await this.bookRepository.find({ 
      where: [
        { user_id: userExists }
      ],
      order: {
        createdAt: 'DESC'
      }
    })

    return books
  }

  async readBy ({ filter, email }: IRequest): Promise<Book[] | Book> {
    const userExists = await this.userRepository.findOne({ email })

    if (!userExists) throw new Error('User does not exist')

    const books = await this.bookRepository.find({
      where: [
        { user_id: userExists, name: Like(`%${filter}%`) },
        { user_id: userExists, author: Like(`%${filter}%`) },
        { user_id: userExists, genre: Like(`%${filter}%`) },
        { user_id: userExists, year: Like(`%${filter}%`) },
        { user_id: userExists, publisher: Like(`%${filter}%`) },
        { user_id: userExists, pages: Like(`%${filter}%`) }
      ],
      order: {
        createdAt: 'DESC'
      }
    })

    return books
  }

  async update ({ email, id, name, author, pages, publisher, genre, year }: IRequest): Promise<Book | undefined> {
    const userExists = await this.userRepository.findOne({ email })

    if (!userExists) throw new Error('User does not exist')

    await this.bookRepository.update({ id, user_id: userExists }, {
      name,
      author,
      pages,
      publisher,
      genre,
      year,
      user_id: userExists
    })

    const book = await this.bookRepository.findOne({ id })

    return book
  }

  async delete ({ email, id }: IRequest): Promise<DeleteResult> {
    const userExists = await this.userRepository.findOne({ email })

    if (!userExists) throw new Error('User does not exist')

    const book = await this.bookRepository.delete({ id, user_id: userExists })

    return book 
  }
}

export default BookService