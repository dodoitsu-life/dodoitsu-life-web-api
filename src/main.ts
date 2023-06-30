import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DI container
  const configService = app.get(ConfigService);

  // global pipes
  app.useGlobalPipes(new ValidationPipe());

  // CORS
  app.enableCors({
    origin: configService.get<string>('cqrsOptions.origin'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // start app
  const port = configService.get<number>('port');
  await app.listen(port, () => {
    console.log(`Application listening on port  ${port}`);
  });
}
bootstrap();
