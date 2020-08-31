"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _RefreshPost = _interopRequireDefault(require("../../../services/RefreshPost"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HomePageController {
  async index(request, response) {
    const {
      posts: postsQuery
    } = request.query;
    const postsBody = request.body;
    const posts = postsQuery && postsQuery.length > 0 ? JSON.parse(String(postsQuery)) : postsBody;
    const urls = posts.map(({
      link
    }) => {
      console.log(link);
      return link;
    });

    const refreshPost = _tsyringe.container.resolve(_RefreshPost.default);

    const content = await refreshPost.execute(urls);
    return response.json(content);
  }

}

exports.default = HomePageController;