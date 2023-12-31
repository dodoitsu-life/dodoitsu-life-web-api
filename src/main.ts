import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DI container
  const configService = app.get(ConfigService);

  // global pipes
  app.useGlobalPipes(new ValidationPipe());

  // CORS
  app.enableCors({
    origin: configService.get<string>('cqrsOptions.origin'),
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // session
  app.use(
    session({
      secret: configService.get<string>('session.secret'),
      resave: true,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('都々逸ライフ Web API')
    .setDescription('都々逸ライフ Web API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // start app
  const port = configService.get<number>('port');
  await app.listen(port, () => {
    console.log(`Application listening on port  ${port}`);
  });
}
bootstrap();
