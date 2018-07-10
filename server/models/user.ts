import * as sequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { UserAttributes, UserInstance } from './interfaces/user-interface';
import * as bcrypt from 'bcrypt';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
  sequelizeStatic.Model<UserInstance, UserAttributes> {
    const userSchema = sequelize.define<UserInstance, UserAttributes>('User', {
      username: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: dataTypes.STRING,
        allowNull: false
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false
      },
      imgUrl: {
        type: dataTypes.STRING,
        allowNull: false
      }
    },
{
      timestamps: false,
      classMethods: {
        comparePassword: function(password, hash, callback) {
          bcrypt.compare(password, hash, function(err, isMatch) {
            if (err) {
              return callback(err, null);
            } else {
              callback(null, isMatch);
            }
          });
        },
      }
    });
    userSchema.hook('beforeCreate', function(user, options, callback) {
      const SALT_WORK_FACTOR = 10;
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
          return callback(err, null);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if(err) {
            return callback(err, null);
          }
          user.password = hash;
          return callback(null, user);
        });
      });
    });
  return userSchema;
}
