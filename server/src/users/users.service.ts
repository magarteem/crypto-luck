import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      id: 1,
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      role: 'user',
    },
    {
      id: 2,
      name: 'Мария Петрова',
      email: 'maria@example.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Александр Сидоров',
      email: 'alex@example.com',
      role: 'user',
    },
  ];

  async findAll(): Promise<UserDto[]> {
    return this.users;
  }
}
