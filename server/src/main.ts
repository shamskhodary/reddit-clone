import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // exceptionFactory: (errors: any) =>
      //   new BadRequestException(Object.values(errors[0].constraints)),
    }),
  );
  app.setGlobalPrefix('/api/v1');
  await app.listen(port);
}
bootstrap();
