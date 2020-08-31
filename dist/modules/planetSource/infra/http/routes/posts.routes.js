"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PostsController = _interopRequireDefault(require("../controllers/PostsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const appointmentsRouter = (0, _express.Router)();
const postsController = new _PostsController.default(); // appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', postsController.index);
var _default = appointmentsRouter;
exports.default = _default;