export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
}

export const databaseConfig: DatabaseConfig = {
  username: 'postgres',
  password: 'user',
  database: 'datingchile_db',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
};
