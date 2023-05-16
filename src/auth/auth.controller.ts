import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RequestFilter } from '../common/filters/request.filter';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { LoginUserDTO } from "../users/dto/login-user.dto";

@UseFilters(new RequestFilter())
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/me")
  @Auth()
  getMe(@GetUser() user: User) {
    const { password, ...rest } = user;
    return rest;
  }

  @Post("/register")  
  registerUser(@Body() createUserDTO: CreateUserDto) {
    return this.authService.registerUser(createUserDTO);
  }

  @Post("/login")
  loginUser(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.loginUser(loginUserDTO);
  }

}
