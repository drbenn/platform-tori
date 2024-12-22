import { Component, OnInit } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Todo } from './types/todo.types';
import { TodoService } from './service/todo.service';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, TextareaModule, CommonModule, ButtonModule],
  providers: [TodoService],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle = '';
  
  constructor(private todoService: TodoService) {}

  protected todoText: string = '';

  ngOnInit(): void {
    
  }

  protected addLorem20(): void {
    this.todoText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui rem eligendi corrupti delectus quis voluptatibus inventore quam distinctio labore quae?'
  }

  protected submitTodo(): void {

  }


  protected items: {date: Date, text: string }[] = [
    {
      date: new Date(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui rem eligendi corrupti delectus quis voluptatibus inventore quam distinctio labore quae?'
    },
    {
      date: new Date(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui rem eligendi corrupti delectus quis voluptatibus inventore quam distinctio labore quae?'
    },
    {
      date: new Date(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui rem eligendi corrupti delectus quis voluptatibus inventore quam distinctio labore quae?'
    },
    {
      date: new Date(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui rem eligendi corrupti delectus quis voluptatibus inventore quam distinctio labore quae?'
    },
    {
      date: new Date(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui rem eligendi corrupti delectus quis voluptatibus inventore quam distinctio labore quae?'
    }
  ];

  loadTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    const newTodo: Partial<Todo> = {
      title: this.newTodoTitle,
      isCompleted: false,
    };

    this.todoService.createTodo(newTodo).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodoTitle = '';
    });
  }

  toggleCompletion(todo: Todo): void {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    this.todoService.updateTodo(todo.id!, updatedTodo).subscribe((updated) => {
      todo.isCompleted = updated.isCompleted;
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }
}
