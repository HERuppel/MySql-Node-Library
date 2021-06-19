import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  age: number

  @CreateDateColumn()
  created_at: Date
}

export default User