export namespace LoggerErrorProviderDTO {
  export type Parameter = {
    message: string;
    value: string | Error | unknown;
  };
  export type Result = void;
}

export interface ILoggerErrorProvider {
  error(parameters: LoggerErrorProviderDTO.Parameter): LoggerErrorProviderDTO.Result;
}
