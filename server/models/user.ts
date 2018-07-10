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
      timestamps: false
    });

    userSchema.comparePassword = (password, hash, callback) => {
      bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) return callback(err, null);
        else callback(null, isMatch);
      })
    }

    userSchema.beforeCreate(user => {
      const SALT_WORK_FACTOR = 10;
      bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
         bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) console.log(err);
          user.password = hash;
          user.save();
        });
      })
      .catch(err => console.log(err));
    });
  return userSchema;
}