import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { User } from '../users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './entities/folder.entity';
import { Model } from 'mongoose';

@Injectable()
export class FoldersService {

  constructor(
    @InjectModel(Folder.name)
    private readonly folderModel: Model<Folder>,
  ) {}

  async create(createFolderDto: CreateFolderDto, user: User): Promise<Folder> {

    const { urlIds = [], ...rest } = createFolderDto;
    
    const folderToCreate = this.folderModel.create({
      ...rest,
      user: user._id,
      urlIds: urlIds,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return (await folderToCreate).save();
  }

  async findAll(user: User): Promise<Folder[]> {
    const folders = await this.folderModel.find({ user: user._id, deletedAt: null });
    return folders;
  }

  async findOne(id: string, user: User): Promise<Folder> {
    const folder = await this.folderModel.findOne({ _id: id, user: user._id, deletedAt: null });
    if(!folder) throw new NotFoundException(`Folder with id ${id} not found`);
    return folder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto, user: User): Promise<Folder> {
    return this.folderModel.findOneAndUpdate({ _id: id, user: user._id }, {
      ...updateFolderDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string, user: User): Promise<boolean> {
    this.folderModel.findOneAndUpdate({ _id: id, user: user._id }, { deletedAt: new Date() });
    return true;
  }
}
