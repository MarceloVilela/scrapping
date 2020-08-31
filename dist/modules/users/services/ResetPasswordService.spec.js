"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPassword;
describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      token,
      password: '123123'
    });
    const updateUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser === null || updateUser === void 0 ? void 0 : updateUser.password).toBe('123123');
  });
  it('should not be able to reset the password whit non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password whit non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password whit non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      token,
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});