"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowPost = _interopRequireDefault(require("../../../services/ShowPost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentController {
  async index(request, response) {
    // const user_id = request.user.id;
    const {
      url
    } = request.query;

    const showPost = _tsyringe.container.resolve(_ShowPost.default);

    const content = await showPost.execute({
      url: String(url)
    });
    return response.json(content);
  }

}

exports.default = AppointmentController;