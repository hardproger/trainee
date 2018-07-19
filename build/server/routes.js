"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var passport = require("passport");
var user_1 = require("./controllers/user");
var photo_1 = require("./controllers/photo");
var utilities_1 = require("./utils/utilities");
function setRoutes(app) {
    // user endpoints
    app.get('/api/users', utilities_1.util.checkAuth, user_1.userCtrl.getUsers);
    app.post('/api/user', user_1.userCtrl.addUser);
    app.delete('/api/user/:id', utilities_1.util.checkAuth, utilities_1.util.adminGuard, user_1.userCtrl.deleteUser);
    app.get('/api/user/:id', utilities_1.util.checkAuth, user_1.userCtrl.findUser);
    app.put('/api/user/:id', utilities_1.util.checkAuth, user_1.userCtrl.updateUser);
    app.post('/api/login', passport.authenticate('local'), user_1.userCtrl.login);
    app.get('/api/logout', utilities_1.util.checkAuth, user_1.userCtrl.logout);
    app.get('/api/isauthenticated', user_1.userCtrl.checkLogin);
    // photo endpoints
    app.get('/api/photos/:userId', utilities_1.util.checkAuth, photo_1.photoCtrl.getPhotos);
    app.post('/api/photo', utilities_1.util.checkAuth, photo_1.photoCtrl.addPhoto);
    app.put('/api/photo/:id', utilities_1.util.checkAuth, utilities_1.util.checkUserRole, photo_1.photoCtrl.updatePhoto);
    app.delete('/api/photo/:id', utilities_1.util.checkAuth, utilities_1.util.checkUserRole, photo_1.photoCtrl.deletePhoto);
    app.get('/api/photo/:id', utilities_1.util.checkAuth, photo_1.photoCtrl.findPhoto);
    // other
    app.post('/api/upload', utilities_1.util.checkAuth, user_1.userCtrl.uploadPhoto);
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    });
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map