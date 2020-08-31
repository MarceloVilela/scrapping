"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PostsController = _interopRequireDefault(require("../controllers/PostsController"));

var _RefreshController = _interopRequireDefault(require("../controllers/RefreshController"));

var _HistoryController = _interopRequireDefault(require("../controllers/HistoryController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const planetRouter = (0, _express.Router)();
const postsController = new _PostsController.default();
const refreshController = new _RefreshController.default();
const historyController = new _HistoryController.default(); // planetRouter.use(ensureAuthenticated);

planetRouter.post('/',
/* celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  },
}), */
postsController.create);
planetRouter.get('/refresh', refreshController.index);
planetRouter.post('/refresh', refreshController.create);
planetRouter.post('/history', historyController.create);
planetRouter.get('/', postsController.index);
planetRouter.get('/:id', postsController.show);
var _default = planetRouter;
exports.default = _default;