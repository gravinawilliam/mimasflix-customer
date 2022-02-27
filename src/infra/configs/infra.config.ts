import { getEnvironmentString } from '@infra/utils/environment';

const GlobalConfig = {
  ENVIRONMENT: getEnvironmentString('NODE_ENV', 'DEVELOPMENT'),
  IS_DEVELOPMENT: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'DEVELOPMENT',
  IS_PRODUCTION: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'PRODUCTION',
  IS_QA: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'QA',
  IS_HOMOLOGATION: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'HOMOLOGATION',
  LOGS_FOLDER: getEnvironmentString('LOGS_FOLDER', 'logs')
};

export { GlobalConfig };
