"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
exports.multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, '../public/images');
        },
        filename: function (req, file, next) {
            var ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        var image = file.mimetype.startsWith('image/');
        if (image) {
            console.log('photo uploaded');
            next(null, true);
        }
        else {
            console.log('file not supported');
            return next();
        }
    }
};
//# sourceMappingURL=multer.config.js.map