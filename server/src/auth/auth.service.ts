import { Injectable, UnauthorizedException, ConflictException, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private users: User[] = [];

  async onModuleInit() {
    // Создаем тестового пользователя при старте сервера
    const hashedPassword = await bcrypt.hash('password123', 10);
    this.users.push({
      id: 1,
      email: 'ivan@example.com',
      password: hashedPassword,
      name: 'Иван Иванов',
    });
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, name } = registerDto;

    // Проверяем, существует ли пользователь
    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const newUser: User = {
      id: this.users.length + 1,
      email,
      password: hashedPassword,
      name,
    };

    this.users.push(newUser);

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Ищем пользователя
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
