import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   const config = new DocumentBuilder()
    .setTitle('NEST CRUD API Using TypeORM')
    .setDescription('This is a simple CRUD API built with NestJS and TypeORM')
    .setVersion('1.0')
    .addTag('crud')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 8080);
  console.log()
  console.log(`Application is running on: http://localhost:${process.env.PORT || 8080}/api`);
  console.log(`

████████╗██╗███╗   ███╗███████╗███████╗██╗  ██╗███████╗███████╗████████╗
╚══██╔══╝██║████╗ ████║██╔════╝██╔════╝██║  ██║██╔════╝██╔════╝╚══██╔══╝
   ██║   ██║██╔████╔██║█████╗  ███████╗███████║█████╗  █████╗     ██║   
   ██║   ██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║██╔══╝  ██╔══╝     ██║   
   ██║   ██║██║ ╚═╝ ██║███████╗███████║██║  ██║███████╗███████╗   ██║   
   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   
`)
}
bootstrap();
