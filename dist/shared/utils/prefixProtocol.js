"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const prefixProtocol = url => !url.startsWith('http') ? `https:${url}` : url;

var _default = prefixProtocol;
exports.default = _default;