import { pathsToModuleNameMapper } from 'ts-jest';

import type { Config } from '@jest/types';

import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  /* Basic settings */
  // Enable verbosity
  verbose: false,
  // The root directory that Jest should scan for tests and modules within
  rootDir: './',
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  // transform: {
  //   '\\.ts$': 'ts-jest'
  // },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true
          },
          target: 'es2021',
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true
          }
        },
        module: {
          type: 'es6',
          noInterop: false
        }
      }
    ]
  },
  coverageReporters: ['text-summary', 'lcov'],
  coverageProvider: 'babel',
  testMatch: ['**/?(*.)+(unit|int|e2e|spec|test).(ts|js)'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  testResultsProcessor: 'jest-sonar-reporter',
  // Resolve 'paths' from tsconfig.json
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  // Ignore paths and modules
  modulePathIgnorePatterns: ['<rootDir>/dist'],

  /* Bootstrap settings */
  // Set initial config and enable jest-extended features
  // setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts', 'jest-extended'],

  /* Global test settings */
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  /* Coverage settings */
  collectCoverage: false,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**/*.ts',
    '!<rootDir>/src/infra/**/*.ts',
    '!<rootDir>/src/domain/shared/utils/either.util.ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/types',
    '<rootDir>/src/index.ts',
    '<rootDir>/src/healthcheck.ts'
  ],
  // Jest custom reporters
  reporters: ['default', 'jest-sonar'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
  /*
   * Uncomment if you want to set thresholds for code coverage
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
  */
};

export default config;
