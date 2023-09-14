import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  // logger objects
  const logger = new Logger('---Backend Server---');
  const logger2 = new Logger('---HTTP---');

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // implementing helmet
  app.use(helmet());

  // implementing morgan
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger2.log(message.replace('\n', '')),
      },
    }),
  );
  // get the config service in the main.ts file
  const configService = app.get(ConfigService);

  // swagger implementation
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
