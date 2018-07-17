import * as sequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { PhotoAttributes, PhotoInstance } from './interfaces/photo-interface';
import {UserAttributes, UserInstance} from './interfaces/user-interface';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
  sequelizeStatic.Model<UserInstance, UserAttributes> {
    const gallerySchema = sequelize.define<PhotoInstance, PhotoAttributes>('Photo', {
      url: {
        type: dataTypes.STRING
      }
    }, {
        timestamps: false
    });

    gallerySchema.associate = (models) => {
      gallerySchema.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    };

    return gallerySchema;
}
