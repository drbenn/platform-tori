import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodoService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    isCompleted: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      mockTodoService.findAll.mockResolvedValue([mockTodo]);
      const result = await controller.findAll();
      expect(result).toEqual([mockTodo]);
      expect(mockTodoService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      mockTodoService.findOne.mockResolvedValue(mockTodo);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockTodo);
      expect(mockTodoService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      mockTodoService.create.mockResolvedValue(mockTodo);
      const result = await controller.create({ title: 'Test Todo' });
      expect(result).toEqual(mockTodo);
      expect(mockTodoService.create).toHaveBeenCalledWith({ title: 'Test Todo' });
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      mockTodoService.update.mockResolvedValue({ ...mockTodo, title: 'Updated Todo' });
      const result = await controller.update(1, { title: 'Updated Todo' });
      expect(result).toEqual({ ...mockTodo, title: 'Updated Todo' });
      expect(mockTodoService.update).toHaveBeenCalledWith(1, { title: 'Updated Todo' });
    });
  });

  describe('remove', () => {
    it('should delete a todo', async () => {
      mockTodoService.remove.mockResolvedValue(undefined);
      const result = await controller.remove(1);
      expect(result).toBeUndefined();
      expect(mockTodoService.remove).toHaveBeenCalledWith(1);
    });
  });
});