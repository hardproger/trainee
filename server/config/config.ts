import { databaseConfig, DatabaseConfig } from './database.config';

class Config {
  private _databaseConfig: DatabaseConfig;
  constructor() {
    this._databaseConfig = databaseConfig;
  }
  getDatabaseConfig(): DatabaseConfig {
    return this._databaseConfig;
  }
}

export const config = new Config();
