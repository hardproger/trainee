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
            index_1.models.User.findAll({ order: [['id', 'ASC']] })
                .then(function (users) { return res.json(users); });
        };
        // add or register new user
        this.addUser = function (req, res) {
            req.body.imgUrl = req.body.sex === 'female' ? 'defaultWoman.jpg' : 'defaultMan.jpg';
            req.body.role = req.body.role && req.user && req.user.role === 'admin' ? req.body.role : 'user';
            req.body.birthday = req.body.year && req.body.day && req.body.month ? new Date(req.body.year, req.body.month, req.body.day) : null;
            // Promise.resolve().then(() => models.User.create(req.body))
            //   .then(regUser => util.handleResponse(res, 200, 'success', 'You have successfully registered!', regUser))
            //   .catch((err) => res.status(400).send(err));
            index_1.models.User
                .create(req.body)
                .then(function (regUser) { return utilities_1.util.handleResponse(res, 200, 'success', 'You have successfully registered!', regUser); })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 409, 'error', 'The username already exists!', null, err.errors[0].message); });
        };
        // delete user
        this.deleteUser = function (req, res) {
            index_1.models.User.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(function () { return utilities_1.util.handleResponse(res, 200, 'success', 'User was successfully deleted!'); })
                .catch(function () { return utilities_1.util.handleResponse(res, 404, 'error', 'User is not found!'); });
        };
        // find user
        this.findUser = function (req, res) {
            index_1.models.User.find({
                where: {
                    id: req.params.id
                }
            }).then(function (user) { return res.json(user); })
                .catch(function () { return utilities_1.util.handleResponse(res, 404, 'error', 'User is not found!'); });
        };
        // update user
        this.updateUser = function (req, res) {
            index_1.models.User.find({
                where: { id: req.params.id }
            })
                .then(function (user) {
                if (user.role === 'admin' && req.user.role === 'moderator') {
                    utilities_1.util.handleResponse(res, 403, 'error', 'You haven\'t permission for do this!');
                }
                user.updateAttributes(req.body)
                    .then(function (upUser) { return utilities_1.util.handleResponse(res, 200, 'success', 'The information was successfully changed!'); })
                    .catch(function (err) { return utilities_1.util.handleResponse(res, 409, 'error', 'The username has already exists!', null, err.errors[0].message); });
            })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 400, 'error', err); });
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
        this.checkLogin = function (req, res) {
            if (req.isAuthenticated()) {
                utilities_1.util.handleResponse(res, 200, 'success', 'The user is authenticated!');
            }
            else {
                utilities_1.util.handleResponse(res, 403, 'error', 'The user is not authenticated!');
            }
        };
        this.uploadPhoto = function (req, res) {
            var upload = multer(config_1.config.getMulterConfig()).single('file');
            upload(req, res, function (err) {
                if (err) {
                    console.log(err);
                }
                res.send(req.file.filename);
            });
        };
    }
    return User;
}());
exports.userCtrl = new User();
//# sourceMappingURL=user.js.map