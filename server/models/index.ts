import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import {config} from '../config/config';
import {UserInstance, UserAttributes} from './interfaces/user-interface';
import {Sequelize} from 'sequelize';

export interface SequelizeModels {
  User: SequelizeStatic.Model<UserInstance, UserAttributes>;
}

class Database {
  private _basename: string;
  private _models: SequelizeModels;
  private _sequelize: Sequelize;

  constructor() {
    this._basename = path.basename(module.filename);
    let dbConfig = config.getDatabaseConfig();

    this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
      dbConfig.password, dbConfig);
    this._models = ({} as any);

    fs.readdirSync(__dirname).filter((file: string) => {
      return (file !== this._basename) && (file !== 'interfaces');
    }).forEach((file: string) => {
      let model = this._sequelize.import(path.join(__dirname, file));
      this._models[(model as any).name] = model;
    });

    Object.keys(this._models).forEach((modelName: string) => {
      if (typeof this._models[modelName].associate === 'function') {
        this._models[modelName].associate(this._models);
      }
    });
  }

  getModels() {
    return this._models;
  }

  getSequelize() {
    return this._sequelize;
  }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
