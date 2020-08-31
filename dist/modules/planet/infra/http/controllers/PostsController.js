"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreatePost = _interopRequireDefault(require("../../../services/CreatePost"));

var _ListPosts = _interopRequireDefault(require("../../../services/ListPosts"));

var _ShowPost = _interopRequireDefault(require("../../../services/ShowPost"));

var _data = _interopRequireDefault(require("./data.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentController {
  async create(request, response) {
    // const user_id = request.user.id;
    // const { listPost: posts } = request.body;
    const {
      listPost: posts
    } = _data.default;

    const createPost = _tsyringe.container.resolve(_CreatePost.default);

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

    for (let i = 0; i < posts.length; i++) {
      const {
        link,
        titulo: title,
        listImage: images,
        listLink: links,
        contents,
        // label,
        data
      } = posts[i];
      const sourceLink = `http://www.planetsuzy.org/${link}`;
      const contentsFormatted = contents.length ? contents : [];
      const labels = ['Valentina Nappi', 'planetsuzy.org', 'HD'];
      console.log(`${labels.join('@')}:${i}`);
      const [day, month, year, hourMinute] = data.split(' ');
      const [hour, minute] = hourMinute.split(':');
      const posted_at = new Date(parseInt(year), monthVal[month], parseInt(day), parseInt(hour), minute); // eslint-disable-next-line no-await-in-loop

      await createPost.execute({
        sourceLink,
        title,
        images,
        links,
        contents: contentsFormatted,
        labels,
        posted_at
      });
    }

    console.log('ok!');
    return response.json({
      ok: true
    });
  }

  async index(request, response) {
    // const user_id = request.user.id;
    const {
      search_query: searchQuery,
      sp,
      page
    } = request.query;
    const searchFilters = sp ? sp.split(',') : [];
    const pageFormatted = Number(page) ? Number(page) : 1;

    const listPost = _tsyringe.container.resolve(_ListPosts.default);

    const content = await listPost.execute({
      searchQuery,
      searchFilters,
      page: pageFormatted
    });
    return response.json(content);
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const showPost = _tsyringe.container.resolve(_ShowPost.default);

    const content = await showPost.execute(id);
    return response.json(content);
  }

}

exports.default = AppointmentController;