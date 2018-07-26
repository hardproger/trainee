"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
function default_1(sequelize, dataTypes) {
    var userSchema = sequelize.define('User', {
        username: {
            type: dataTypes.STRING,
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
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['username', 'email']
            }
        ]
    });
    userSchema.comparePassword = function (password, hash, callback) {
        bcrypt.compare(password, hash, function (err, isMatch) {
            if (err) {
                return callback(err, null);
            }
            else {
                callback(null, isMatch);
            }
        });
    };
    userSchema.getUsers = function () { return userSchema.findAll({ order: [['id', 'ASC']] }); };
    userSchema.addUser = function (req) { return userSchema.findOrCreate({ where: { username: req.body.username } &&
            { email: req.body.email }, defaults: req.body }); };
    userSchema.deleteUser = function (id) { return userSchema.destroy({ where: { id: id } }); };
    userSchema.findUser = function (findId) { return userSchema.find({ where: { id: findId } }); };
    userSchema.beforeCreate(function (user) {
        var SALT_WORK_FACTOR = 10;
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(function (salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                user.password = hash;
                user.save();
            });
        })
            .catch(function (err) { return console.log(err); });
    });
    userSchema.associate = function (models) {
        userSchema.hasMany(models.Photo, {
            foreignKey: 'userId'
        });
    };
    return userSchema;
}
exports.default = default_1;
//# sourceMappingURL=user.js.map