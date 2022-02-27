// eslint-disable-next-line import/no-unresolved
import { performance } from 'node:perf_hooks';

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
  const bootstrapDuration = Math.floor(bootstrapEndTime - bootstrapStartTime);

  logger.info({
    message: '',
    value: `Infrastructure bootstrap took ${bootstrapDuration}ms`
  });

  return { bootstrapDuration };
};

export { bootstrap, IBootstrapResult };
