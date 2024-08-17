import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { mockHttpService } from './test/mockHttpService';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: HttpService, // including other service for testing
          useValue: mockHttpService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
