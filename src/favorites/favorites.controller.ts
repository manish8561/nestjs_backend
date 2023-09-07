import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
  @Get('read/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const publicFolderPath = join(__dirname, '../..', 'public');

    const filePath = join(publicFolderPath, filename);

    try {
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (err) {
      res.status(404).send('File not found');
    }
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    const filePath = await this.favoritesService.writeFileToPublicFolder(
      file.originalname,
      file.buffer,
    );
    return { filePath };
  }
}
