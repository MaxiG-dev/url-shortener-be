import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDTO } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(createUserDTO: CreateUserDto) {
    const user = await this.usersService.create(createUserDTO);
    return this.getResponseObject(user);
  }

  async loginUser(loginUserDTO: LoginUserDTO) {
    const user = await this.usersService.login(loginUserDTO);
    return this.getResponseObject(user);
  }

  private getResponseObject(user: User) {
    return {
      ...user,
      token: this.getJWTToken({
        id: user._id,
        email: user.email,
        folders: user.foldersIds,
        roles: user.roles,
      }),
    }
  }

  private getJWTToken(payload: JWTPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

}
