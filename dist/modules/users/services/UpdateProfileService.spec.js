"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com'
    });
    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('johntre@example.com');
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456'
    });
    expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password whitout old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password whit wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com',
      old_password: 'wrong-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});