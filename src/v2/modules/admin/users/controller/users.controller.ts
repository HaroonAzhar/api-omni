import { Controller, Get } from '@nestjs/common';

import { BaseAdminController } from '../../baseGeneric/baseAdmin.controller';
import { User } from '../user.interface';
import { UsersService } from '../users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController extends BaseAdminController<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Get('/identities')
  getIdentities() {
    return this.usersService.getIdentities();
  }
}
