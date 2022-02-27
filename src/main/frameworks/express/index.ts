import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import { AppConfig, AppInfo } from '@main/config/app.config';
import { SwaggerConfig } from '@main/config/swagger.config';
import { showBanner } from '@main/utils/banner.util';

export class ExpressFramework {
  public async execute(): Promise<Application> {
    const app = this.initializeSwagger(express());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(helmet());
    await app.listen(AppConfig.PORT, () => showBanner());
    return app;
  }

  private initializeSwagger(app: Application): Application {
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
      customSiteTitle: `${AppInfo.APP_NAME} - OAS3`,
      swaggerOptions: {} as swaggerUiExpress.SwaggerOptions
    };

    const swaggerSpec: swaggerUiExpress.JsonObject = swaggerJSDoc(jsDocumentOptions);
    app.use(
      `${AppConfig.BASE_PATH}${AppConfig.DOCS_PATH}`,
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(swaggerSpec, swaggerUiOptions)
    );

    return app;
  }
}
