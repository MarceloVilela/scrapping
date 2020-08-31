"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.body;

    const listProviderMonthAvailability = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availbility = await listProviderMonthAvailability.execute({
      provider_id,
      day,
      month,
      year
    });
    return response.json(availbility);
  }

}

exports.default = ProviderMonthAvailabilityController;