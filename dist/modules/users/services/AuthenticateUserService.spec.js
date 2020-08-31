"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let authenticateUser;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate whit non existing user', async () => {
    expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate whit wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});