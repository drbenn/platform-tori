import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  const mockRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    isCompleted: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      mockRepository.find.mockResolvedValue([mockTodo]);
      const result = await service.findAll();
      expect(result).toEqual([mockTodo]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockTodo);
      const result = await service.findOne(1);
      expect(result).toEqual(mockTodo);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      mockRepository.create.mockReturnValue(mockTodo);
      mockRepository.save.mockResolvedValue(mockTodo);
      const result = await service.create({ title: 'Test Todo' });
      expect(result).toEqual(mockTodo);
      expect(mockRepository.create).toHaveBeenCalledWith({ title: 'Test Todo' });
      expect(mockRepository.save).toHaveBeenCalledWith(mockTodo);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOneBy.mockResolvedValue({ ...mockTodo, title: 'Updated Todo' });
      const result = await service.update(1, { title: 'Updated Todo' });
      expect(result).toEqual({ ...mockTodo, title: 'Updated Todo' });
      expect(mockRepository.update).toHaveBeenCalledWith(1, { title: 'Updated Todo' });
    });
  });

  describe('remove', () => {
    it('should delete a todo', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await service.remove(1);
      expect(result).toBeUndefined();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});