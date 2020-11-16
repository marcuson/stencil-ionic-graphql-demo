import { injectable } from 'inversify';

@injectable()
export class ServerConfig {
  port: number;
}
