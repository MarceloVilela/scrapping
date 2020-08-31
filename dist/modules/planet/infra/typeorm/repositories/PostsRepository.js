"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Bulletin = _interopRequireDefault(require("../schemas/Bulletin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Bulletin.default, process.env.DB_MONGO_CONNECTION);
  }

  async create({
    sourceLink,
    title,
    images,
    links,
    contents,
    labels,
    posted_at
  }) {
    const post = this.ormRepository.create({
      sourceLink,
      title,
      images,
      links,
      contents,
      labels,
      posted_at
    });
    await this.ormRepository.save(post);
    return post;
  }

  async find({
    searchQuery,
    searchFilters,
    page
  }) {
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage; // 0

    const take = page * itemsPerPage; // 10

    const titleValueFormatted = new RegExp(searchQuery, 'i'); // const whereTitle = searchQuery ? { $regex: titleValueFormatted } : //;

    const labels = searchFilters.map(filter => ({
      labels: {
        $in: [filter]
      }
    }));
    /* console.log('-----------------');
    console.log(Date.now().toLocaleString());
    console.log(searchQuery, searchFilters);
    console.log(titleValueFormatted, labels);
    console.log(page); */

    /* await getMongoRepository(Post).deleteMany({
      $and: [
        { created_at: { $lte: new Date(2020, 7, 23, 10, 53, 12) } },
        { labels: { $in: ['Chloe Amour'] } },
        { labels: { $in: ['HD'] } },
      ],
    }); */

    console.log(searchQuery);
    const [data, total] = await this.ormRepository.findAndCount({
      where: searchFilters.length > 0 ? {
        $and: [{
          title: {
            $regex: titleValueFormatted
          }
        }, ...labels]
      } : {
        title: {
          $regex: titleValueFormatted
        }
      },
      order: {
        posted_at: 'DESC'
      },
      skip,
      take
    }); // return [];

    return {
      data,
      total
    };
  }

  async findOne(id) {
    const post = await this.ormRepository.findOne(id);
    return post;
  }

}

var _default = PostsRepository;
exports.default = _default;