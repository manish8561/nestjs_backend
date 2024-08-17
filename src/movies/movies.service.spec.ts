import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { mockHttpService } from './test/mockHttpService';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: HttpService, // including other service for testing
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
