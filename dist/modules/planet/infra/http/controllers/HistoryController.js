"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateHistory = _interopRequireDefault(require("../../../services/CreateHistory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentController {
  async create(request, response) {
    const {
      url: sourceLink,
      labels,
      page
    } = request.body;

    const createHistory = _tsyringe.container.resolve(_CreateHistory.default);

    const created = await createHistory.execute({
      sourceLink,
      labels,
      page
    });
    return response.json(created);
  }

}

exports.default = AppointmentController;