"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("./ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderMonthAvailability;
describe('ListProvider', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderMonthAvailability = new _ListProviderMonthAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 9, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 11, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 12, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 13, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 15, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 16, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 17, 0, 0)
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5
    });
    expect(availability).toEqual(expect.arrayContaining([{
      day: 19,
      available: true
    }, {
      day: 20,
      available: false
    }, {
      day: 21,
      available: false
    }, {
      day: 22,
      available: true
    }]));
  });
});