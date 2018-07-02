var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var userSchema = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
   timestamps: false,
   classMethods: {
     comparePassword: function(password, hash, callback) {
       bcrypt.compare(password, hash, function(err, isMatch) {
         if(err) {
           return callback(err, null);
         } else {
           callback(null, isMatch);
         }
       });
     },
   }
  });

  userSchema.hook('beforeCreate', function(user, options, callback) {
    var SALT_WORK_FACTOR = 10;
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) {
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
