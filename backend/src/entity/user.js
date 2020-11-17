"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRole = exports.User = void 0;
var bcrypt_1 = require("bcrypt");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.comparePassword = function (password) {
        return bcrypt_1["default"].compare(password, this.password);
    };
    User.prototype.setPassword = function (password) {
        return bcrypt_1["default"].hashSync(password, 10);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column({ unique: true })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ select: false })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "role");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], User.prototype, "deleted");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["EDITOR"] = "editor";
    UserRole["DELETED"] = "";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
