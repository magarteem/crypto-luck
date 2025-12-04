import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальный фильтр исключений для единообразных JSON ответов
  app.useGlobalFilters(new HttpExceptionFilter());

  // Включение CORS для работы с frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Глобальный префикс для всех API роутов
  app.setGlobalPrefix('api');

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Crypto Luck API')
    .setDescription('API документация для Crypto Luck бэкенда')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(3001);
  console.log('Server is running on http://localhost:3001');
  console.log('Swagger documentation: http://localhost:3001/api/swagger');
}
bootstrap();
