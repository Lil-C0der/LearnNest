import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // 连接 mongoose
  mongoose.connect('mongodb://localhost/nest-blog-api', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
  });
  const app = await NestFactory.create(AppModule);

  // 全局管道，类似中间件，请求会通过这个管道，这里是一个验证的功能
  app.useGlobalPipes(new ValidationPipe());

  // swagger 相关配置
  const config = new DocumentBuilder()
    .setTitle('nest blog api')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(5000);
}
bootstrap();
