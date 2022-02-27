import 'winston-daily-rotate-file';

import emoji from 'node-emoji';
import { addColors, createLogger, format, Logger as WinstonLoggerType, transports } from 'winston';

import { ILoggerErrorProvider, LoggerErrorProviderDTO } from '@domain/providers/logger/logger-error-provider.interface';
import { ILoggerInfoProvider, LoggerInfoProviderDTO } from '@domain/providers/logger/logger-info-provider.interface';
import { GlobalConfig } from '@infra/configs/infra.config';

enum LevelName {
  SILLY = 'silly',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
  HTTP = 'http',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

const LEVEL_SEVERITY = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const LEVEL_COLOR = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'grey',
  debug: 'white',
  silly: 'cyan'
};

const DEFAULT_FORMAT = format.combine(
  format.errors({ stack: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  format.printf(info =>
    `[${info.timestamp}] ${info.level.toLocaleUpperCase()} ${info.message} ${info.stack || ''}`.trim()
  )
);

const CONSOLE_FORMAT = format.combine(
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  format(info => ({ ...info, level: info.level.toUpperCase() }))(),
  format.errors({ stack: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  format.colorize({ all: true }),
  format.printf(info => `[${info.timestamp}] ${info.level} ${info.message} ${info.stack || ''}`.trim())
);

export class WinstonLoggerProvider implements ILoggerErrorProvider, ILoggerInfoProvider {
  private readonly logger: WinstonLoggerType;

  private readonly level: string = GlobalConfig.IS_DEVELOPMENT ? LevelName.DEBUG : LevelName.INFO;

  private readonly logsFolder: string = GlobalConfig.LOGS_FOLDER;

  constructor() {
    this.logger = this.configureAndGetLogger();
  }

  public error(parameters: LoggerErrorProviderDTO.Parameter): void {
    if (parameters.value instanceof Error) {
      this.logger.error(emoji.get('x'), parameters.value);
    } else {
      this.logger.error(`${emoji.get('x')} ${this.getValue(parameters.value)}`);
    }
  }

  public info(parameters: LoggerInfoProviderDTO.Parameter): void {
    this.logger.info(`${emoji.get('bulb')} ${this.getValue(parameters.value)}`);
  }

  private configureAndGetLogger = (): WinstonLoggerType => {
    addColors(LEVEL_COLOR);

    const transportsList = [
      new transports.Console({
        level: this.level,
        handleExceptions: true,
        format: CONSOLE_FORMAT
      }),
      new transports.File({
        filename: `${this.logsFolder}/error.log`,
        level: LevelName.ERROR,
        handleExceptions: true,
        maxsize: 5_242_880, // 5MB
        maxFiles: 1
      }),
      new transports.DailyRotateFile({
        filename: `${this.logsFolder}/all-%DATE%.log`,
        level: this.level,
        handleExceptions: true,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d'
      })
    ];

    return createLogger({
      level: this.level,
      levels: LEVEL_SEVERITY,
      format: DEFAULT_FORMAT,
      transports: transportsList,
      exitOnError: false,
      handleExceptions: true
    });
  };

  private getValue = (value: string | unknown): string => {
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  };
}
