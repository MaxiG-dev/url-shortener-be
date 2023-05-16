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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const defaultFolder: FolderDto = {
      title: 'My URLs',
      urls: [],
      isDefault: true,
      isDeleted: false,
    };

    const user: CreateUserDto = {
      createDate: new Date(),
      role: 'user',
      folders: [defaultFolder],
      isDeleted: false,
      isPremium: true,
      ...createUserDto,
    };
    const userSaved = await this.userModel.create(user);
    return userSaved;
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userModel.deleteMany();
    return `This action removes a #${id} user`;
  }

  async login(loginUserDTO: LoginUserDTO) {
    const { email, password } = loginUserDTO;

    const user = await this.userModel.findOne({
      where: { email, deletedAt: null },
    });
    if (!user) throw new DataBaseException(`User with email ${email} not found`, 404);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)throw new BadRequestException(`Password is not valid`);

    return user;
  }
}
