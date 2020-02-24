import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Restourant Api Endpoints')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT || serverConfig.port;
  await app.listen(PORT);
  console.log(`Listening app on port: ${PORT}`);
}
bootstrap();
