export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
}

export const databaseConfig: DatabaseConfig = {
  username: 'ayslxord',
  password: 'fplKeeM_cxXO01AZ4-uhi5slFM8-Em0P',
  database: 'ayslxord',
  host: 'pellefant.db.elephantsql.com',
  port: 5432,
  dialect: 'postgres'
};
