"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const profileController = new _ProfileController.default();
profileRouter.use(_ensureAuthenticated.default);
profileRouter.get('/', profileController.show);
profileRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    old_password: _celebrate.Joi.string(),
    password: _celebrate.Joi.string(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
  }
}), profileController.update);
var _default = profileRouter;
exports.default = _default;