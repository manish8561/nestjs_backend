import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('---Backend Server---');
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Feed back example')
    .setDescription('The feedback API description')
    .setVersion('1.0')
    .addTag('feedback')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get('PORT');
  await app.listen(port, () => {
    logger.log('Backend is running on the port: ' + port);
  });
}
bootstrap();
