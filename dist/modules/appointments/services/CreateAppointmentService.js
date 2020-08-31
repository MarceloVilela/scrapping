"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _INotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/INotificationsRepository"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateAppointmentService {
  constructor(appointmentsRepository, notificationsRepository) {
    this.appointmentsRepository = appointmentsRepository;
    this.notificationsRepository = notificationsRepository;
  }

  async execute({
    date,
    provider_id,
    user_id
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);

    if ((0, _dateFns.isBefore)(appointmentDate, (0, _dateFns.startOfHour)(Date.now()))) {
      throw new _AppError.default("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new _AppError.default("You can't only create an appointment whit yourself.");
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      throw new _AppError.default('You can only create appointments between 8am and 5pm.');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new _AppError.default('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    });
    const dateFormatted = (0, _dateFns.format)(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`
    });
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;