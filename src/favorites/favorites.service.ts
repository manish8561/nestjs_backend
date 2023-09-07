import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import * as fs from 'fs';
import { join } from 'path';
@Injectable()
export class FavoritesService {
  create(createFavoriteDto: CreateFavoriteDto) {
    return 'This action adds a new favorite';
  }

  findAll() {
    return `This action returns all favorites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }

  async writeFileToPublicFolder(
    filename: string,
    fileContent: Buffer,
  ): Promise<string> {
    const publicFolderPath = join(__dirname, '../..', 'public');

    const filePath = join(publicFolderPath, filename);

    try {
      fs.writeFileSync(filePath, fileContent);
      return filePath;
    } catch (err) {
      throw new Error(`Error writing file: ${err}`);
    }
  }
}
