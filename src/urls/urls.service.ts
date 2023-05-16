import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { User } from 'src/users/entities/user.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name)
    private readonly urlModel: Model<User>,
  ) {}

  async create(createUrlDto: CreateUrlDto) {
    const urlId = nanoid(8);
    const url = {
      urlId,
      counter: 0,
      isDeleted: false,
      ...createUrlDto,
    };
    await this.urlModel.create(url);
    return url;
  }

  async findAll() {
    const urls = await this.urlModel.find();
    return urls;
  }

  async findOne(id: string) {
    const url: UpdateUrlDto = await this.urlModel.findOne({ urlId: id });
    return url?.url;
  }

  update(id: string, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: string) {
    return `This action removes a #${id} url`;
  }
}
