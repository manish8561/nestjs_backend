import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { mockFavoriteModel } from './test/mockFavoriteModel';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: 'FavoriteModel', // including other respository for testing
          useValue: mockFavoriteModel,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
