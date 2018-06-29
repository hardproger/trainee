var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var userSchema = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    role: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
   timestamps: false,
   classMethods: {
     comparePassword: function(password, callback) {
       bcrypt.compare(password, this.password, function(err, isMatch) {
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
