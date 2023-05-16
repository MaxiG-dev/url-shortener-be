import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { RequestFilter } from 'src/common/filters/request.filter';

@UseFilters(new RequestFilter())
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  @Auth()
  create(@Body() createFolderDto: CreateFolderDto, @GetUser() user: User) {
    return this.foldersService.create(createFolderDto, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.foldersService.findAll(user);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.foldersService.findOne(id, user);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto, @GetUser() user: User) {
    return this.foldersService.update(id, updateFolderDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.foldersService.remove(id, user);
  }
}
