"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderAppoitmentsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderAppoitmentsService {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute({
    provider_id,
    year,
    month,
    day
  }) {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    });
    return appointments;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProviderAppoitmentsService;
exports.default = _default;