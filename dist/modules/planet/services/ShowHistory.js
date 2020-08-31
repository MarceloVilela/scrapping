"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IHistoryRepository = _interopRequireDefault(require("../repositories/IHistoryRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListHistoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GalleryHistoryRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IHistoryRepository.default === "undefined" ? Object : _IHistoryRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListHistoryService {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }

  async execute({
    searchFilters
  }) {
    const history = await this.historyRepository.findOne({
      searchFilters
    });
    return history;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListHistoryService;
exports.default = _default;