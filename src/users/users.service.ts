import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FolderDto } from './dto/folder.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { DataBaseException } from 'src/common/filters/database.exception';
import { ValidRoles } from 'src/auth/interfaces/validRoles';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {

    const { folders = [], ...rest } = createUserDto;

    const response = await this.userModel.create({
      ...rest,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      foldersIds: folders,
      isPremium: false,
      roles: [ValidRoles.user],
      password: await bcrypt.hash(rest.password, 10),
    });

    return response.toJSON() as User;
  }

  async findAll() {
    const users = await this.userModel.find({ deletedAt: null });
    return users;
  }

  async findOne(id: string, user: User): Promise<User> {
    if (id !== user._id) throw new BadRequestException(`You can't see other users`);
    const userInDB = await this.userModel.findOne({ _id: id });
    return userInDB;
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: User) {
    if(id !== user._id) throw new BadRequestException(`You can't update other users`);
    const userUpdate = await this.userModel.findByIdAndUpdate(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
    return userUpdate;
  }

  async remove(id: string, user: User) {
    if(id !== user._id) throw new BadRequestException(`You can't delete other users`);
    const userDelete = await this.userModel.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
    return userDelete;
  }

  async login(loginUserDTO: LoginUserDTO) {
    const { email, password } = loginUserDTO;

    const response = await this.userModel.findOne({ email , deletedAt: null });
    if (!response) throw new DataBaseException(`User with email ${email} not found`, 404);

    const isPasswordValid = await bcrypt.compare(password, response.password);
    if (!isPasswordValid) throw new BadRequestException(`Password is not valid`);

    return response.toJSON() as User;
  }
}
