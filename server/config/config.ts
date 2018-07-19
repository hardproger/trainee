import { databaseConfig, DatabaseConfig } from './database.config';
import { multerConfig, MulterConfig } from './multer.config';

class Config {
  private _databaseConfig: DatabaseConfig;
  private _multerConfig: MulterConfig;
  constructor() {
    this._databaseConfig = databaseConfig;
    this._multerConfig = multerConfig;
  }
  getDatabaseConfig(): DatabaseConfig {
    return this._databaseConfig;
  }
  getMulterConfig(): MulterConfig {
    return this._multerConfig;
  }
}

export const config = new Config();
