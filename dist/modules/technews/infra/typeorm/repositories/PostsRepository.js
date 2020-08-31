"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Post = _interopRequireDefault(require("../schemas/Post"));

var _PostContent = _interopRequireDefault(require("../schemas/PostContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Post.default, process.env.DB_MONGO_CONNECTION);
  }

  async create({
    link,
    title,
    thumb,
    contents
  }) {
    const post = this.ormRepository.create({
      link,
      title,
      thumb,
      contents
    });
    const contentRepostitory = (0, _typeorm.getRepository)(_PostContent.default, 'mongo');
    const contentsItems = contentRepostitory.create(contents);
    post.contents = contentsItems;
    await this.ormRepository.save(post);
    return post;
  }

  async findByUrl(urls) {
    const urlsFormatted = urls.map(url => new RegExp(url, 'i'));
    const urlFilters = urlsFormatted.map(urlFormatted => ({
      link: {
        $regex: urlFormatted
      }
    }));
    const posts = await this.ormRepository.find({
      where: {
        $or: [...urlFilters]
      }
    }); // const posts = await this.ormRepository.find();

    return posts;
  }

  async findByOrigin({
    url,
    page = 1,
    allowContents
  }) {
    const itemsPerPage = 20;
    const skip = (page - 1) * itemsPerPage; // 0

    const take = itemsPerPage; // 10

    const urlFormatted = new RegExp(url, 'i');
    const originFilter = {
      link: {
        $regex: urlFormatted
      }
    };
    const [data, total] = await this.ormRepository.findAndCount({
      select: !allowContents ? ['id', 'link', 'title', 'thumb', 'created_at', 'posted_at'] : undefined,
      where: { ...originFilter
      },
      order: {
        created_at: 'DESC'
      },
      skip,
      take
    });
    const formattedData = data.map((item, key) => ({ ...item,
      title: `${skip + (key + 1)}: ${item.title}`
    }));
    return {
      data: formattedData,
      total
    };
  }

  async findDetails(url) {
    const urlFilters = {
      link: {
        $in: [url]
      }
    };
    const post = await this.ormRepository.findOne({
      where: { ...urlFilters
      }
    });
    return post;
  }

}

var _default = PostsRepository;
exports.default = _default;