import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import * as fs from 'fs';
import { join } from 'path';
import { Favorite } from './schemas/favorites.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const createdCat = new this.favoriteModel(createFavoriteDto);
    return createdCat.save();
  }

  async findAll(): Promise<Favorite[]> {
    return this.favoriteModel.find();
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
