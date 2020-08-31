"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointment = _interopRequireDefault(require("../entities/Appointment"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AppointmentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Appointment.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointment.default);
  }

  async findByDate(date) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date
      }
    });
    return findAppointment || null;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }) {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}, _temp)) || _class) || _class) || _class);
var _default = AppointmentsRepository;
exports.default = _default;