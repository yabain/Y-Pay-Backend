import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './shared/exceptions';
import { AddSwaggerDoc } from './shared/docs/swagger';
import { AllHttpExceptionsFilter } from './shared/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }));

  /**
   * {
    credentials: true,
    origin:[
      "http://localhost:4200",
      "https://dev.y-nkap.com",
      "https://y-nkap.com"
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET']
  }
   */
  app.enableCors();
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalFilters(new AllHttpExceptionsFilter());
  useContainer(app.select(AppModule),{fallbackOnErrors:true});

  AddSwaggerDoc(app);

  await app.listen(port);
}
bootstrap();
