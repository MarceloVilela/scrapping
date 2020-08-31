"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _posts = _interopRequireDefault(require("../../../../modules/technews/infra/http/routes/posts.routes"));

var _posts2 = _interopRequireDefault(require("../../../../modules/technewsSource/infra/http/routes/posts.routes"));

var _posts3 = _interopRequireDefault(require("../../../../modules/planet/infra/http/routes/posts.routes"));

var _posts4 = _interopRequireDefault(require("../../../../modules/planetSource/infra/http/routes/posts.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
const routes = (0, _express.Router)();
routes.use('/technews', _posts.default);
routes.use('/technews-source', _posts2.default);
routes.use('/planet', _posts3.default);
routes.use('/planet-source', _posts4.default);
var _default = routes;
exports.default = _default;