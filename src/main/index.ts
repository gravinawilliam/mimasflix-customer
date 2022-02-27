import 'reflect-metadata';
import 'source-map-support/register';

import { AppConfig } from './config/app.config';
import Framework from './frameworks';

export class Main {
  public async start(): Promise<void> {
    await Framework.select({
      framework: AppConfig.FRAMEWORK
    });
  }
}
