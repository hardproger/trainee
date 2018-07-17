import { Instance } from 'sequelize';

export interface PhotoAttributes {
  url: string;
  userId: number;
}

export interface PhotoInstance extends Instance<PhotoAttributes> {
  dataValues: PhotoAttributes;
}
