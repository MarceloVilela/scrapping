"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _History = _interopRequireDefault(require("../schemas/History"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HistoryRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_History.default, process.env.DB_MONGO_CONNECTION);
  }

  async create({
    sourceLink,
    labels,
    page
  }) {
    const history = this.ormRepository.create({
      sourceLink,
      labels,
      page
    });
    await this.ormRepository.save(history);
    return history;
  }

  async findOne({
    searchFilters
  }) {
    const labels = searchFilters.map(filter => ({
      labels: {
        $in: [filter]
      }
    }));
    console.log('history-findOne-labels', labels);
    const history = await this.ormRepository.findOne({
      where: {
        $and: [...labels]
      }
    });
    return history;
  }

  async update({
    labels: searchFilters,
    page
  }) {
    const labels = searchFilters.map(filter => ({
      labels: {
        $in: [filter]
      }
    }));
    const history = await this.ormRepository.update({
      where: {
        $and: [...labels]
      }
    }, {
      page
    });
    console.log('update-history-service', page); // history.page = page;
    // history.save();
  }

}

var _default = HistoryRepository;
exports.default = _default;