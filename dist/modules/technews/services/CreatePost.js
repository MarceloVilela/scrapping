"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IPostRepository = _interopRequireDefault(require("../repositories/IPostRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePostService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PostsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPostRepository.default === "undefined" ? Object : _IPostRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePostService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }

  async execute({
    link,
    title,
    thumb,
    contents
  }) {
    const appointment = await this.postsRepository.create({
      link,
      title,
      thumb,
      contents
    });
    return appointment;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreatePostService;
exports.default = _default;