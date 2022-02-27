import { getEnvironmentNumber, getEnvironmentString } from '@infra/utils/environment';

// eslint-disable-next-line no-restricted-imports
import packageJson from '../../../package.json';

const AppInfo = {
  APP_NAME: getEnvironmentString('APP_NAME', 'template'),
  APP_DESCRIPTION: getEnvironmentString('APP_DESCRIPTION', '🚀👩‍🚀 To infinity and beyond!'),
  APP_VERSION: packageJson.version,
  AUTHOR_NAME: getEnvironmentString('AUTHOR_NAME', 'Will Gravina'),
  AUTHOR_EMAIL: getEnvironmentString('AUTHOR_EMAIL', 'dev.gravinawilliam@gmail.com')
};

const AppConfig = {
  PORT: getEnvironmentNumber('APP_PORT', 3000),
  BASE_PATH: getEnvironmentString('BASE_PATH', ''),
  DOCS_PATH: getEnvironmentString('DOCS_PATH', '/docs'),
  FRAMEWORK: getEnvironmentString('FRAMEWORK', 'express') as 'express' | 'nestjs'
};

export { AppConfig, AppInfo };
