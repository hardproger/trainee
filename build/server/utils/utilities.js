"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../models/index");
var Util = /** @class */ (function () {
    function Util() {
        var _this = this;
        this.handleResponse = function (res, code, status, msg, user, err) {
            if (user === void 0) { user = null; }
            if (err === void 0) { err = null; }
            res.status(code).json({
                status: status,
                message: msg,
                user: user,
                error: err
            });
        };
        this.checkAuth = function (req, res, next) {
            if (req.isAuthenticated()) {
                next();
            }
            else {
                _this.handleResponse(res, 403, 'error', 'Not authenticated');
            }
        };
        this.adminGuard = function (req, res, next) {
            if (req.user.role === 'admin') {
                next();
            }
            else {
                _this.handleResponse(res, 403, 'error', 'You don\'t have permission!');
            }
        };
        this.checkUserRole = function (req, res, next) {
            index_1.models.Photo.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(function (user) {
                if (user.userId === req.user.id) {
                    next();
                }
                else {
                    _this.handleResponse(res, 403, 'error', 'You don\'t have permission!');
                }
            })
                .catch(function (err) {
                _this.handleResponse(res, 500, 'error', 'Something went wrong :(');
                console.log(err);
            });
        };
    }
    return Util;
}());
exports.util = new Util();
//# sourceMappingURL=utilities.js.map