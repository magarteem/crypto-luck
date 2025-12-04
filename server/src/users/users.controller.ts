import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersResponseDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ со списком пользователей',
    type: UsersResponseDto,
  })
  async getUsers(): Promise<UsersResponseDto> {
    const users = await this.usersService.findAll();
    return {
      success: true,
      data: users,
    };
  }
}
