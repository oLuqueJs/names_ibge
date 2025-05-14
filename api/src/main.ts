import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP = await NestFactory.create(AppModule);
  APP.enableCors()

  const PORT = process.env.PORT
  await APP.listen(PORT ?? 3000);
  
  console.log(`☕ Hello World!\nAPI is running at localhost/${PORT}`)
}
bootstrap();
