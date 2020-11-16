import { injectable } from 'inversify';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

@injectable()
export class LoggerConfig {
  level: LogLevel;
}
