"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d'
  }
};
exports.default = _default;