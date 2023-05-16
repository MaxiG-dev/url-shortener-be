import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FolderDto } from './dto/folder.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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
    await this.userModel.create(user);
    return user;
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
}
