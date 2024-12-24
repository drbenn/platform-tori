import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("todo_data") // specifically name table 'todo' instead of default of class 'Todo'
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isCompleted: boolean;
}