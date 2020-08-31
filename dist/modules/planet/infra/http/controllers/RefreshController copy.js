"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreatePost = _interopRequireDefault(require("../../../services/CreatePost"));

var _ListPosts = _interopRequireDefault(require("../../../services/ListPosts"));

var _ShowPost = _interopRequireDefault(require("../../../../planetSource/services/ShowPost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
class AppointmentController {
  async index(request, response) {
    const {
      url
    } = request.query;
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

    const content = await showPost.execute({
      url: String(url)
    });
    const pageStart = 56;
    const pageEnd = content.pageLast; // pageEnd = 55;

    for (let page = pageStart; page <= pageEnd; page++) {
      const currentUrl = String(url).replace('999', String(page));
      console.log(`request page(${page}): ${currentUrl}`);
      const postsPage = await showPost.execute({
        url: currentUrl
      });

      for (let key = 0; key < postsPage.posts.length; key++) {
        const {
          sourceLink,
          title,
          images,
          links,
          contents: contentsFormatted,
          posted_at: date
        } = postsPage.posts[key];
        const labels = ['Chloe Amour', 'planetsuzy.org', 'HD'];
        console.log(`${labels.join('@')} ... ${title}`);
        const [day, month, year, hourMinute] = date.split(' ');
        const [hour, minute] = hourMinute.split(':');
        const posted_at = new Date(parseInt(year), monthVal[month], parseInt(day), parseInt(hour), minute);
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
    }

    console.log('ok!');
    return response.json({
      ok: true
    });
  }

  async qwert(request, response) {
    // const user_id = request.user.id;
    const {
      search_query: searchQuery,
      sp
    } = request.query;
    const searchFilters = sp ? sp.split(',') : [];

    const showPost = _tsyringe.container.resolve(_ListPosts.default);

    const content = await showPost.execute({
      searchQuery,
      searchFilters
    });
    return response.json(content);
  }

}

exports.default = AppointmentController;