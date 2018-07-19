"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var index_1 = require("../models/index");
var utilities_1 = require("../utils/utilities");
var Photo = /** @class */ (function () {
    function Photo() {
        this.getPhotos = function (req, res) {
            console.log(req.body);
            index_1.models.Photo.findAll({
                where: {
                    userId: req.params.userId
                },
                order: [
                    ['id', 'ASC']
                ]
            })
                .then(function (photos) { return res.json(photos); })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err); });
        };
        this.addPhoto = function (req, res) {
            index_1.models.Photo.create({
                url: req.body.url,
                userId: req.user.id
            })
                .then(function (newPhoto) { return utilities_1.util.handleResponse(res, 200, 'success', 'Photo was successfully added!', newPhoto); })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err); });
        };
        this.updatePhoto = function (req, res) {
            index_1.models.Photo.find({
                where: {
                    id: req.params.id
                }
            })
                .then(function (photo) {
                photo.updateAttributes(req.body)
                    .then(function (upPhoto) { return utilities_1.util.handleResponse(res, 200, 'success', 'Photo was successfully updated!', upPhoto); })
                    .catch(function (err) { return utilities_1.util.handleResponse(res, 500, 'error', 'Something went wrong :(', null, err); });
            })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 404, 'error', 'Photo is not found!', null, err); });
        };
        this.deletePhoto = function (req, res) {
            index_1.models.Photo.find({
                where: {
                    id: req.params.id
                }
            })
                .then(function (photo) {
                photo.destroy(photo)
                    .then(function () {
                    fs.unlink("client/assets/userImg/" + photo.url, function () { });
                    utilities_1.util.handleResponse(res, 200, 'success', 'Photo was successfully deleted!');
                })
                    .catch(function (err) {
                    utilities_1.util.handleResponse(res, 500, 'error', 'Something went wrong :(');
                    console.log(err);
                });
            })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 404, 'error', 'Photo is not found!', null, err); });
        };
        this.findPhoto = function (req, res) {
            index_1.models.Photo.find({
                where: {
                    id: req.params.id
                }
            })
                .then(function (foundPhoto) { return res.json(foundPhoto); })
                .catch(function (err) { return utilities_1.util.handleResponse(res, 404, 'error', 'Photo is not found!', null, err); });
        };
    }
    return Photo;
}());
exports.photoCtrl = new Photo();
//# sourceMappingURL=photo.js.map