"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreatePost = _interopRequireDefault(require("../../../services/CreatePost"));

var _ShowHistory = _interopRequireDefault(require("../../../services/ShowHistory"));

var _UpdateHistory = _interopRequireDefault(require("../../../services/UpdateHistory"));

var _ShowPost = _interopRequireDefault(require("../../../../planetSource/services/ShowPost"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
class AppointmentController {
  async create(request, response) {
    const {
      url,
      labels,
      page
    } = request.body; // const labels = JSON.parse(labelsFormatted);
    // if (url.includes('172')) {
    //  return response.json({ ok: true });
    // }

    const monthVal = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11
    };

    const showPost = _tsyringe.container.resolve(_ShowPost.default);

    const createPost = _tsyringe.container.resolve(_CreatePost.default);

    const updateHistory = _tsyringe.container.resolve(_UpdateHistory.default);

    console.log('Planet@Refresh@Create', url, labels);
    const {
      posts
    } = await showPost.execute({
      url
    });
    const postsCreated = [];

    for (let key = 0; key < posts.length; key++) {
      const {
        sourceLink,
        title,
        images,
        links,
        contents: contentsFormatted,
        posted_at: date
      } = posts[key]; // console.log(`${labels.join('@')} ... ${title}`);

      let posted_at;

      if (date.split(' ').length === 4) {
        const [day, month, year, hourMinute] = date.split(' ');
        const [hour, minute] = hourMinute.split(':');
        posted_at = new Date(parseInt(year), monthVal[month], parseInt(day), parseInt(hour), minute);
      } else {
        const [dayTextual, hourMinute] = date.split(' ');
        const [hour, minute] = hourMinute.split(':');
        const day = dayTextual === 'Yesterday' ? new Date().getDate() - 1 : new Date().getDate();
        posted_at = new Date(parseInt(year), monthVal[month], parseInt(day), parseInt(hour), minute);
      }

      const result = await createPost.execute({
        sourceLink,
        title,
        images,
        links,
        contents: contentsFormatted,
        labels,
        posted_at
      });
      postsCreated.push(result);
    }

    await updateHistory.execute({
      labels,
      page
    });
    console.log('ok!');
    return response.json(postsCreated);
  }

  async index(request, response) {
    const {
      labels
    } = request.query;

    const showPost = _tsyringe.container.resolve(_ShowPost.default);

    const showHistory = _tsyringe.container.resolve(_ShowHistory.default); // last page from history
    // return response.json({ labels, controller: 'refresh-index' });


    const history = await showHistory.execute({
      searchFilters: labels
    });

    if (!history) {
      throw new _AppError.default('History not found');
    }

    const {
      page: pageStart,
      sourceLink: url
    } = history; // discovers latest page currently

    const content = await showPost.execute({
      url
    });
    const {
      pageLast: pageEnd
    } = content;
    const items = [];

    for (let page = pageStart; page <= pageEnd; page++) {
      items.push({
        url: `${process.env.APP_API_URL}/planet/refresh`,
        params: {
          url: String(url).replace('999', String(page)),
          labels,
          page
        }
      });
    }

    return response.json({
      labels,
      items
    });
  }

}

exports.default = AppointmentController;