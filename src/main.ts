import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfiguration } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Optimus Restful dashboard API')
    .setDescription('The Optimus API document description')
    .setVersion('1.0')
    .addTag('Optimus API')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config, {
  // ignoreGlobalPrefix: false,
});
  SwaggerModule.setup('api', app, documentFactory, {
  jsonDocumentUrl: 'swagger/json',
});


  const appConfig = app.get(AppConfiguration);
  await app.listen(appConfig.appPort);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
