import { interfaces } from 'inversify';
import * as winston from 'winston';
import { format, Logger, transports } from 'winston';
import { DITypes } from '../di';
import { LoggerConfig } from './logger.config';

export type LoggerFactory = (label: string) => Logger;

export function createLoggerFactory(context: interfaces.Context): LoggerFactory {
  const config = context.container.get<LoggerConfig>(DITypes.LoggerConfig);

  return (label: string) => {
    if (winston.loggers.has(label)) {
      return winston.loggers.get(label);
    }

    const printfFormat = format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} ${level}: ${label !== undefined ? '[' + label + ']' : ''} ${message}`;
    });
    const newLogger = winston.loggers.add(label, {
      level: config.level,
      transports: [
        new transports.Console({
          format: format.combine(
            format.label({ label: label }),
            format.timestamp(),
            format.colorize(),
            printfFormat
          ),
        }),
      ],
    });

    return newLogger;
  };
}
