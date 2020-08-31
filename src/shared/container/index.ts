import { container } from 'tsyringe';

import '../providers';

import IPostsRepository from '@modules/technews/repositories/IPostRepository';
import PostsRepository from '@modules/technews/infra/typeorm/repositories/PostsRepository';
//
import ITechNewsSourcePost from '@modules/technewsSource/repositories/IPostRepository';
import TecnoBlog from '@modules/technewsSource/infra/crosscutting/repositories/TecnoBlog';
import Tecmundo from '@modules/technewsSource/infra/crosscutting/repositories/Tecmundo';
import OlharDigital from '@modules/technewsSource/infra/crosscutting/repositories/OlharDigital';
//
import IPlanetPostsRepository from '@modules/planet/repositories/IPostRepository';
import PlanetPostsRepository from '@modules/planet/infra/typeorm/repositories/PostsRepository';
import IPlanetHistoryRepository from '@modules/planet/repositories/IHistoryRepository';
import PlanetHistoryRepository from '@modules/planet/infra/typeorm/repositories/HistoryRepository';
//
import IPlanetSourcePost from '@modules/planetSource/repositories/IPostRepository';
import PlanetSuzy from '@modules/planetSource/infra/crosscutting/repositories/PlanetSuzy';

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<ITechNewsSourcePost>(
  'TechNewsSource',
  OlharDigital,
);
container.registerSingleton<ITechNewsSourcePost>('TechNewsSource', Tecmundo);
container.registerSingleton<ITechNewsSourcePost>('TechNewsSource', TecnoBlog);

//

container.registerSingleton<IPlanetPostsRepository>(
  'GalleryRepository',
  PlanetPostsRepository,
);

container.registerSingleton<IPlanetHistoryRepository>(
  'GalleryHistoryRepository',
  PlanetHistoryRepository,
);

container.registerSingleton<IPlanetSourcePost>('PlanetSource', PlanetSuzy);
