"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreatePost = _interopRequireDefault(require("../../../services/CreatePost"));

var _ListPost = _interopRequireDefault(require("../../../services/ListPost"));

var _ShowPost = _interopRequireDefault(require("../../../services/ShowPost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentController {
  async create(request, response) {
    const {
      link,
      title,
      thumb,
      contents
    } = request.body;

    const createPost = _tsyringe.container.resolve(_CreatePost.default);

    const post = await createPost.execute({
      link,
      title,
      thumb,
      contents
    });
    return response.json(post);
  }

  async index(request, response) {
    const {
      url,
      page,
      allowContents
    } = request.query;

    const listPost = _tsyringe.container.resolve(_ListPost.default);

    const content = await listPost.execute({
      url: String(url),
      page: Number(page),
      allowContents: Boolean(allowContents)
    });
    return response.json({ ...content,
      count: content.data.length
    });
  }

  async show(request, response) {
    const {
      url
    } = request.query;

    const showPost = _tsyringe.container.resolve(_ShowPost.default);

    const content = await showPost.execute(String(url));
    return response.json(content);
  }

}

exports.default = AppointmentController;