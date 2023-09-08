import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoritesModule } from './favorites/favorites.module';
import { MoviesModule } from './movies/movies.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://172.16.15.7:27017/nest'),
    // `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/nest?authSource=admin`,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'MONGODB_USERNAME',
        )}:${configService.get('MONGODB_PASSWORD')}@${configService.get(
          'MONGODB_HOST',
        )}:27017/nest?authSource=admin`,
      }),
      inject: [ConfigService],
    }),
    FavoritesModule,
    MoviesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'), // Specify the root folder for static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
