import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import User from './User'

@Entity('book')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  pages: number

  @Column()
  author: string

  @Column()
  year: number

  @Column()
  publisher: string

  @Column()
  genre: string

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id: User

  @CreateDateColumn()
  createdAt: Date
}

export default Book