"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var index_1 = require("../models/index");
var utilities_1 = require("../utils/utilities");
var config_1 = require("../config/config");
var User = /** @class */ (function () {
    function User() {
        // get all users
        this.getUsers = function (req, res) {
            index_1.models.User.getUsers()
                .then(function (users) { return res.json(users); });
        };
        // add or register new user
        this.addUser = function (req, res) {
            req.body.imgUrl = req.body.sex === 'female' ? 'defaultWoman.jpg' : 'defaultMan.jpg';
            req.body.role = req.body.role && req.user && req.user.role === 'admin' ? req.body.role : 'user';
            req.body.birthday = req.body.year && req.body.day && req.body.month ?
                new Date(req.body.year, req.body.month, req.body.day) : new Date();
            index_1.models.User.addUser(req)
                .spread(function (result, created) {
                if (created) {
                    utilities_1.util.handleResponse(res, 200, 'success', 'You have successfully registered!', result);
                }
                else {
                    utilities_1.util.handleResponse(res, 409, 'error', 'The email/username already exists!', null);
                }
            })
                .catch(function (err) {
                console.log(err);
                utilities_1.util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err);
            });
        };
        // delete user
        this.deleteUser = function (req, res) {
            index_1.models.User.deleteUser(req.params.id)
                .then(function () { return utilities_1.util.handleResponse(res, 200, 'success', 'User was successfully deleted!'); })
                .catch(function () { return utilities_1.util.handleResponse(res, 404, 'error', 'User is not found!'); });
        };
        // find user
        this.findUser = function (req, res) {
            index_1.models.User.findUser(req.params.id)
                .then(function (user) { return res.json(user); })
                .catch(function () { return utilities_1.util.handleResponse(res, 404, 'error', 'User is not found!'); });
        };
        // update user
        this.updateUser = function (req, res) {
            index_1.models.User.findUser(req.params.id)
                .then(function (user) {
                if ((req.user.role === 'user' || req.user.role === 'moderator') && user.id !== req.user.id) {
                    utilities_1.util.handleResponse(res, 403, 'error', 'You haven\'t permission for do this!');
                    return;
                }
                user.updateAttributes(req.body)
                    .then(function () { return utilities_1.util.handleResponse(res, 200, 'success', 'The information was successfully changed!'); })
                    .catch(function (err) { return utilities_1.util.handleResponse(res, 409, 'error', 'The username has already exists!', null, err.errors[0].message); });
            })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 500, 'error', err); });
        };
        this.login = function (req, res) {
            var user = {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role,
                token: req.user.token
            };
            utilities_1.util.handleResponse(res, 200, 'success', 'You have successfully logged in!', user);
        };
        this.logout = function (req, res) {
            req.logout();
            utilities_1.util.handleResponse(res, 200, 'success', 'You have successfully logged off');
        };
        this.uploadPhoto = function (req, res) {
            var upload = multer(config_1.config.getMulterConfig()).single('file');
            upload(req, res, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                index_1.models.User.findUser(req.user.id)
                    .then(function (user) {
                    user.updateAttributes(req.body)
                        .then(function (upUser) {
                        res.send(req.file.filename);
                        utilities_1.util.handleResponse(res, 200, 'success', 'Photo was successfully changed!', upUser);
                    })
                        .catch(function (error) { return utilities_1.util.handleResponse(res, 500, 'error', 'Error', null, error); });
                });
            });
        };
    }
    return User;
}());
exports.userCtrl = new User();
//# sourceMappingURL=user.js.map