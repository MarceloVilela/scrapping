"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowHomePage = _interopRequireDefault(require("../../../services/ShowHomePage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HomePageController {
  async index(request, response) {
    // const user_id = request.user.id;
    const {
      url
    } = request.query;

    const showHome = _tsyringe.container.resolve(_ShowHomePage.default);

    const content = await showHome.execute({
      url: String(url)
    });
    return response.json(content);
  }

}

exports.default = HomePageController;