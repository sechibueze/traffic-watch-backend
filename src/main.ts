import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const PORT = process.env.PORT || 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/v1')
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Traffic watch')
    .setDescription('The traffic watch API docs')
    .setVersion('1.0')
    .addTag('API: https://traffic-watch.herokuapp.com/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
