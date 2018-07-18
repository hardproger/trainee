import * as sequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { UserAttributes, UserInstance } from './interfaces/user-interface';
import * as bcrypt from 'bcrypt';

export default function (sequelize: Sequelize, dataTypes: DataTypes):
  sequelizeStatic.Model<UserInstance, UserAttributes> {
    const userSchema = sequelize.define<UserInstance, UserAttributes>('User', {
      username: {
        type: dataTypes.STRING,
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
      },
      email: {
        type: dataTypes.STRING,
        unique: true
      },
      sex: {
        type: dataTypes.STRING
      },
      looking: {
        type: dataTypes.STRING
      },
      between: {
        type: dataTypes.STRING
      },
      living: {
        type: dataTypes.STRING
      },
      education: {
        type: dataTypes.STRING
      },
      kids: {
        type: dataTypes.STRING
      },
      region: {
        type: dataTypes.INTEGER
      },
      comuna: {
        type: dataTypes.STRING
      },
      birthday: {
        type: dataTypes.DATEONLY
      },
      title: {
        type: dataTypes.STRING
      },
      description: {
        type: dataTypes.STRING
      },
      status: {
        type: dataTypes.STRING
      },
      job: {
        type: dataTypes.STRING
      },
      religion: {
        type: dataTypes.STRING
      },
      smoker: {
        type: dataTypes.STRING
      },
      height: {
        type: dataTypes.INTEGER
      },
      weight: {
        type: dataTypes.INTEGER
      },
      body: {
        type: dataTypes.STRING
      },
      hair: {
        type: dataTypes.STRING
      },
      eyes: {
        type: dataTypes.STRING
      },
      tatoos: {
        type: dataTypes.STRING
      },
      piercing: {
        type: dataTypes.STRING
      },
      intereses: {
        type: dataTypes.ARRAY(dataTypes.BOOLEAN),
        defaultValue: []
      }
    },
    {
      timestamps: false
    });

    userSchema.comparePassword = (password, hash, callback) => {
      bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) {
         return callback(err, null);
      } else {
          callback(null, isMatch);
        }
      });
    };

    userSchema.beforeCreate(user => {
      const SALT_WORK_FACTOR = 10;
      bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
         bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          user.password = hash;
          user.save();
        });
      })
      .catch(err => console.log(err));
    });

    userSchema.associate = (models) => {
      userSchema.hasMany(models.Photo, {
        foreignKey: 'userId'
      });
    };
  return userSchema;
}
