"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var SequelizeStatic = require("sequelize");
var config_1 = require("../config/config");
var Database = /** @class */ (function () {
    function Database() {
        var _this = this;
        this._basename = path.basename(module.filename);
        var dbConfig = config_1.config.getDatabaseConfig();
        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._models = {};
        fs.readdirSync(__dirname).filter(function (file) {
            return (file !== _this._basename) && (file !== 'interfaces') && (file !== 'index.js.map') && (file !== 'user.js.map') && (file !== 'photo.js.map');
        }).forEach(function (file) {
            var model = _this._sequelize.import(path.join(__dirname, file));
            _this._models[model.name] = model;
        });
        Object.keys(this._models).forEach(function (modelName) {
            if (typeof _this._models[modelName].associate === 'function') {
                _this._models[modelName].associate(_this._models);
            }
        });
    }
    Database.prototype.getModels = function () {
        return this._models;
    };
    Database.prototype.getSequelize = function () {
        return this._sequelize;
    };
    return Database;
}());
var database = new Database();
exports.models = database.getModels();
exports.sequelize = database.getSequelize();
//# sourceMappingURL=index.js.map