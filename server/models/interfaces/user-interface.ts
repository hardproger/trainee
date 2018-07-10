import { Instance } from 'sequelize';

export interface UserAttributes {
  username: string;
  password: string;
  role: string;
  imgUrl: string;
}

export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes;
}
