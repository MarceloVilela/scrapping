"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PostsController = _interopRequireDefault(require("../controllers/PostsController"));

var _HomePageController = _interopRequireDefault(require("../controllers/HomePageController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const sourceRouter = (0, _express.Router)();
const postsController = new _PostsController.default();
const homePageController = new _HomePageController.default(); // sourceRouter.use(ensureAuthenticated);

sourceRouter.get('/', homePageController.index);
sourceRouter.get('/detail', postsController.index);
var _default = sourceRouter;
exports.default = _default;