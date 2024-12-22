import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { TodoService } from './service/todo.service';
import { Todo } from './types/todo.types';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  const mockTodos: Todo[] = [
    { id: 1, title: 'Test Todo 1', isCompleted: false },
    { id: 2, title: 'Test Todo 2', isCompleted: true },
  ];

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj<TodoService>('TodoService', [
      'getTodos',
      'createTodo',
      'updateTodo',
      'deleteTodo',
    ]);

    mockTodoService.getTodos.and.returnValue(of(mockTodos));
    mockTodoService.createTodo.and.returnValue(of({ id: 3, title: 'New Todo', isCompleted: false }));
    mockTodoService.updateTodo.and.returnValue(of({ id: 1, title: 'Updated Todo', isCompleted: true }));
    mockTodoService.deleteTodo.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TodoComponent],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    component.ngOnInit();
    expect(mockTodoService.getTodos).toHaveBeenCalled();
    expect(component.todos).toEqual(mockTodos);
  });

  it('should add a new todo', () => {
    component.newTodoTitle = 'New Todo';
    component.addTodo();

    expect(mockTodoService.createTodo).toHaveBeenCalledWith({ title: 'New Todo', isCompleted: false });
    expect(component.todos.length).toBe(3);
    expect(component.todos[2].title).toBe('New Todo');
  });

  it('should toggle the completion status of a todo', () => {
    const todo = mockTodos[0];
    component.toggleCompletion(todo);

    expect(mockTodoService.updateTodo).toHaveBeenCalledWith(todo.id!, { ...todo, isCompleted: !todo.isCompleted });
    expect(todo.isCompleted).toBe(true); // Updated value
  });

  it('should delete a todo', () => {
    component.deleteTodo(1);

    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(1);
    expect(component.todos.length).toBe(1); // One todo removed
    expect(component.todos[0].id).toBe(2);
  });
});