import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  constructor(private readonly httpService: HttpService) {}
  create(createMovieDto: CreateMovieDto) {
    return { data: 'This action adds a new movie' };
  }

  // async findAll(): Promise<any> {
  //   const a = await this.httpService.axiosRef.get(
  //     'https://swapi.dev/api/films',
  //   );
  //   console.log(a);
  //   return a.data;
  // }

  async findAll(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>('https://swapi.dev/api/films').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
