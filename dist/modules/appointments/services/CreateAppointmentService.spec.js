"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 7, 10, 12).getTime());
    const appointment = await createAppointment.execute({
      date: new Date(2020, 7, 10, 13),
      user_id: 'user-id',
      provider_id: 'provider-id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });
  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 7, 10, 12).getTime());
    const appointmentDate = new Date(2020, 7, 10, 13);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    });
    expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 10, 12).getTime());
    expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 7, 10, 12).getTime());
    await expect(createAppointment.execute({
      date: new Date(2020, 7, 10, 7),
      user_id: 'user7am-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 7, 10, 18),
      user_id: 'user5pm-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});