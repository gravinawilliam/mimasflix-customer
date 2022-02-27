export namespace LoggerInfoProviderDTO {
  export type Parameter = {
    message: string;
    value: string | unknown;
  };
  export type Result = void;
}

export interface ILoggerInfoProvider {
  info(parameters: LoggerInfoProviderDTO.Parameter): LoggerInfoProviderDTO.Result;
}
