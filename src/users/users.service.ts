import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uui } from 'uuid';
import { hashSync } from 'bcrypt'

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uui();
    newUser.password = hashSync(newUser.password, 10);
    this.users.push(newUser);
  }
}
