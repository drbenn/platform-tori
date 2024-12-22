import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: 'localhost', // Database host
      port: 3306, // MySQL port
      username: 'root', // Your MySQL username
      password: 'password', // Your MySQL password
      database: 'todo_db', // Your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entities
      // synchronize: true, // Auto-create database schema (disable in production)
    }),
    TodoModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
