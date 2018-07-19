"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_config_1 = require("./database.config");
var multer_config_1 = require("./multer.config");
var Config = /** @class */ (function () {
    function Config() {
        this._databaseConfig = database_config_1.databaseConfig;
        this._multerConfig = multer_config_1.multerConfig;
    }
    Config.prototype.getDatabaseConfig = function () {
        return this._databaseConfig;
    };
    Config.prototype.getMulterConfig = function () {
        return this._multerConfig;
    };
    return Config;
}());
exports.config = new Config();
//# sourceMappingURL=config.js.map