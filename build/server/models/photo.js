"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, dataTypes) {
    var gallerySchema = sequelize.define('Photo', {
        url: {
            type: dataTypes.STRING
        }
    }, {
        timestamps: false
    });
    gallerySchema.associate = function (models) {
        gallerySchema.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return gallerySchema;
}
exports.default = default_1;
//# sourceMappingURL=photo.js.map