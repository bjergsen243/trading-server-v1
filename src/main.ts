import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all-exception.filter';
import { LoggerService } from './shared/utils/utils-logger';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as fs from 'fs';
import * as httpContext from 'express-http-context';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter(LoggerService.get('HTTP')));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(httpContext.middleware);
  app.enableCors();
  app.setGlobalPrefix(configService.get('app.prefixUrl'));
  app.enableVersioning({ type: VersioningType.URI });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await _setupSwagger(app);
  const appPort = configService.get('app.port');
  await app.listen(appPort, () => {
    console.log(
      `swagger: http://localhost:${appPort}${configService.get('app.swagger.path')}`,
    );
  });
}

async function _setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const swaggerUser = configService.get('app.swagger.user');
  const swaggerPassword = configService.get('app.swagger.password');
  if (swaggerUser && swaggerPassword) {
    app.use(
      [configService.get('app.swagger.path')],
      basicAuth({
        challenge: true,
        users: {
          [swaggerUser as string]: swaggerPassword,
        },
      }),
    );
  }
  const options = new DocumentBuilder()
    .setTitle(configService.get('app.swagger.title'))
    .setDescription(configService.get('app.swagger.description'))
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  try {
    const dir = `${process.cwd()}/output-specs`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const outputSwaggerFile = `${dir}/${configService.get('app.name')}.json`;
    fs.writeFileSync(outputSwaggerFile, JSON.stringify(document, null, 2), {
      encoding: 'utf8',
    });
  } catch (e) {
    console.warn(`Could not write swagger docs to file: ${e}`);
  }

  SwaggerModule.setup(configService.get('app.swagger.path'), app, document, {
    customSiteTitle: 'Trading Server',

    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

bootstrap();
