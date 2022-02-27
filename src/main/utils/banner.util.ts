import endent from 'endent';
import figlet from 'figlet';

import { GlobalConfig } from '@infra/configs/infra.config';
import { WinstonLoggerProvider } from '@infra/providers/logger/winston-logger.provider';
import { AppConfig, AppInfo } from '@main/config/app.config';

export const showBanner = () => {
  const logger = new WinstonLoggerProvider();
  const banner = endent`Application started successfully!
      ${figlet.textSync(AppInfo.APP_NAME)}
       Name: ${AppInfo.APP_NAME}
       Description: ${AppInfo.APP_DESCRIPTION}
       Version: ${AppInfo.APP_VERSION}
       Port: ${AppConfig.PORT}
       Base Path: ${AppConfig.BASE_PATH !== '' ? AppConfig.BASE_PATH : '/'}
       Docs Path: ${AppConfig.DOCS_PATH}
       Environment: ${GlobalConfig.ENVIRONMENT}
       Framework: ${AppConfig.FRAMEWORK}
       Author: ${AppInfo.AUTHOR_NAME}
       Email: ${AppInfo.AUTHOR_EMAIL}
    `;
  logger.info({
    value: banner,
    message: ''
  });
};
