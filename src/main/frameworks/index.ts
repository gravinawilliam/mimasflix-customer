import gracefulShutdown from 'http-graceful-shutdown';

import { ILoggerInfoProvider } from '@domain/providers/logger/logger-info-provider.interface';
import { WinstonLoggerProvider } from '@infra/providers/logger/winston-logger.provider';

import { ExpressFramework } from './express';
import { NestjsFramework } from './nestjs';

namespace SelectFrameworkDTO {
  export type Parameters = {
    framework: 'express' | 'nestjs';
  };
  export type Return = Promise<any>;
}

class Framework {
  private readonly logger: ILoggerInfoProvider;

  constructor() {
    this.logger = new WinstonLoggerProvider();
  }

  public async select({ framework }: SelectFrameworkDTO.Parameters): SelectFrameworkDTO.Return {
    switch (framework) {
      case 'express':
        await this.initializeExpress();
        break;
      case 'nestjs':
        await this.initializeNestjs();
        break;
      default:
        await this.initializeExpress();
        break;
    }
  }

  private async initializeExpress(): Promise<void> {
    const express = new ExpressFramework();
    const server = await express.execute();

    gracefulShutdown(server, {
      finally: () => {
        this.logger.info({
          message: 'Server gracefully shut down!',
          value: 'Shutting down...'
        });
      }
    });
  }

  private async initializeNestjs(): Promise<void> {
    const nestjs = new NestjsFramework();

    await nestjs.execute();
  }
}

export default new Framework();
