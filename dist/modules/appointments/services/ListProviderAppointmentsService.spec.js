"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderAppointments;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderAppointments = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 8, 15, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 8, 15, 15, 0, 0)
    });
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 9,
      day: 15
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});