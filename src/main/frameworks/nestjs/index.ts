import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import { AppConfig, AppInfo } from '@main/config/app.config';
import { SwaggerConfig } from '@main/config/swagger.config';
import { showBanner } from '@main/utils/banner.util';

import { AppModule } from './modules/global/app.module';

export class NestjsFramework {
  public async execute(): Promise<INestApplication> {
    const server = this.initializeSwagger(await NestFactory.create(AppModule));
    await server.listen(AppConfig.PORT, () => showBanner());
    return server;
  }

  private initializeSwagger(app: NestFastifyApplication): NestFastifyApplication {
    const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
      openapi: '3.0.3',
      info: {
        title: AppInfo.APP_NAME,
        version: AppInfo.APP_VERSION,
        description: AppInfo.APP_DESCRIPTION,
        contact: {
          name: AppInfo.AUTHOR_NAME,
          email: AppInfo.AUTHOR_EMAIL
        }
      }
    };

    const jsDocumentOptions: swaggerJSDoc.Options = {
      swaggerDefinition,
      apis: [path.join(__dirname, '../../../domain/controllers/**/__docs__/*oas.yml')]
    };

    const swaggerUiOptions: swaggerUiExpress.SwaggerUiOptions = {
      customCss: SwaggerConfig.THEME,
      customSiteTitle: `${AppInfo.APP_NAME} - OAS311`,
      swaggerOptions: {} as swaggerUiExpress.SwaggerOptions
    };

    const swaggerSpec: swaggerUiExpress.JsonObject = swaggerJSDoc(jsDocumentOptions);
    app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec, swaggerUiOptions));

    return app;
  }
}
