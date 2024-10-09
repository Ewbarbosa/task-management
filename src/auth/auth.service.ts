import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  private jwtExpiration: number;

  constructor(
    private readonly usersServices: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtExpiration = +this.configService.get<number>('JWT_EXPIRATION_TIME');
  }

  sigIn(username: string, password: string): AuthResponseDto {

    const foundUser = this.usersServices.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpiration
    }
  }

}
