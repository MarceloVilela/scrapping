"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _utils = require("../../../shared/utils");

var _ArticleContent = require("../infra/crosscutting/schemas/ArticleContent");

var _dec, _dec2, _dec3, _dec4, _class;

//import articleAsset from '../repositories/fakes/assets/json/article/tecnoblog.json';
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
    const {
      link,
      title,
      thumb,
      contents,
      created_at
    } = await sourceCurrent.getPost({
      url
    }); //const { link, title, thumb, contents, created_at } = articleAsset as Article;

    const filterType = str => Object.values(_ArticleContent.ArticleContentType).includes(str);

    const filterValueEmpty = str => str && str.replace(/\s/g, '').length;

    const contentsFormatted = contents.filter(({
      type,
      value
    }) => filterValueEmpty(value) && filterType(type));
    return {
      link: (0, _utils.prefixProtocol)(link),
      title,
      thumb: (0, _utils.prefixProtocol)(thumb),
      contents: contentsFormatted,
      created_at
    };
  }

}) || _class) || _class) || _class) || _class);
var _default = ShowPostService;
exports.default = _default;