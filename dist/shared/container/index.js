"use strict";

var _tsyringe = require("tsyringe");

require("../providers");

var _PostsRepository = _interopRequireDefault(require("../../modules/technews/infra/typeorm/repositories/PostsRepository"));

var _TecnoBlog = _interopRequireDefault(require("../../modules/technewsSource/infra/crosscutting/repositories/TecnoBlog"));

var _Tecmundo = _interopRequireDefault(require("../../modules/technewsSource/infra/crosscutting/repositories/Tecmundo"));

var _OlharDigital = _interopRequireDefault(require("../../modules/technewsSource/infra/crosscutting/repositories/OlharDigital"));

var _PostsRepository2 = _interopRequireDefault(require("../../modules/planet/infra/typeorm/repositories/PostsRepository"));

var _HistoryRepository = _interopRequireDefault(require("../../modules/planet/infra/typeorm/repositories/HistoryRepository"));

var _PlanetSuzy = _interopRequireDefault(require("../../modules/planetSource/infra/crosscutting/repositories/PlanetSuzy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('PostsRepository', _PostsRepository.default);

_tsyringe.container.registerSingleton('TechNewsSource', _OlharDigital.default);

_tsyringe.container.registerSingleton('TechNewsSource', _Tecmundo.default);

_tsyringe.container.registerSingleton('TechNewsSource', _TecnoBlog.default); //


_tsyringe.container.registerSingleton('GalleryRepository', _PostsRepository2.default);

_tsyringe.container.registerSingleton('GalleryHistoryRepository', _HistoryRepository.default);

_tsyringe.container.registerSingleton('PlanetSource', _PlanetSuzy.default);