"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PostsController = _interopRequireDefault(require("../controllers/PostsController"));

var _RefreshController = _interopRequireDefault(require("../controllers/RefreshController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const postsRouter = (0, _express.Router)();
const postsController = new _PostsController.default();
const refreshController = new _RefreshController.default(); // appointmentsRouter.use(ensureAuthenticated);

postsRouter.post('/',
/* celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  },
}), */
postsController.create);
postsRouter.get('/post/origin', postsController.index);
postsRouter.get('/post', postsController.show);
postsRouter.get('/refresh', refreshController.index);
var _default = postsRouter;
exports.default = _default;