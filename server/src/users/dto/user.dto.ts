import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  id: number;

  @ApiProperty({ example: 'Иван Иванов', description: 'Имя пользователя' })
  name: string;

  @ApiProperty({ example: 'ivan@example.com', description: 'Email пользователя' })
  email: string;

  @ApiProperty({ example: 'user', description: 'Роль пользователя' })
  role: string;
}

export class UsersResponseDto {
  @ApiProperty({ example: true, description: 'Успешность операции' })
  success: boolean;

  @ApiProperty({ type: [UserDto], description: 'Список пользователей' })
  data: UserDto[];
}
