// eslint-disable-next-line import/no-unresolved
import { performance } from 'node:perf_hooks';

import { TypeormConnection } from './database/typeorm/helpers/connection';
import { WinstonLoggerProvider } from './providers/logger/winston-logger.provider';

interface IBootstrapResult {
  bootstrapDuration: number;
}

const bootstrap = async (): Promise<IBootstrapResult> => {
  const bootstrapStartTime = performance.now();
  const logger = new WinstonLoggerProvider();

  logger.info({
    message: '',
    value: 'Bootstrapping infrastructure...'
  });

  const bootstrapEndTime = performance.now();

  await TypeormConnection.getInstance()
    .connect()
    // eslint-disable-next-line promise/always-return
    .then(async () => {
      logger.info({
        value: 'ok',
        message: 'Typeorm connection established'
      });
    })
    .catch((error: Error) => {
      logger.error({
        value: error,
        message: 'Error while establishing typeorm connection'
      });
    });

  const bootstrapDuration = Math.floor(bootstrapEndTime - bootstrapStartTime);

  logger.info({
    message: '',
    value: `Infrastructure bootstrap took ${bootstrapDuration}ms`
  });

  return { bootstrapDuration };
};

export { bootstrap, IBootstrapResult };
