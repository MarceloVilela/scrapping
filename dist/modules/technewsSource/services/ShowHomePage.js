"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _utils = require("../../../shared/utils");

var _dec, _dec2, _dec3, _dec4, _class;

//import previewsAsset from '../repositories/fakes/assets/json/home/tecnoblog.json';
let ShowPostService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.injectAll)('TechNewsSource')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [Array]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowPostService {
  constructor(sources) {
    this.sources = sources;
  }

  async execute({
    url
  }) {
    const [sourceCurrent] = this.sources.filter(item => url.includes(item.getOriginUrl()));
    const previews = await sourceCurrent.getHome({
      url
    }); //const previews = previewsAsset as IResponseHomeDTO;

    const posts = previews.posts.map(preview => {
      const created_at = (0, _utils.formatDate)(preview.created_at);
      return { ...preview,
        created_at
      };
    });
    const data = {
      posts
    };
    return data;
  }

}) || _class) || _class) || _class) || _class);
var _default = ShowPostService;
exports.default = _default;