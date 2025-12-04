import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'ivan@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ example: 'Иван Иванов' })
  name: string;
}

export class LoginDto {
  @ApiProperty({ example: 'ivan@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}

