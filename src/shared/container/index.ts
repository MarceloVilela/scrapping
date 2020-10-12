import "reflect-metadata"
import { container } from 'tsyringe';

import '../providers';

import IPostsRepository from '@modules/technews/repositories/IPostRepository';
import PostsRepository from '@modules/technews/infra/typeorm/repositories/PostsRepository';
//
import ITechNewsSourcePost from '@modules/technewsSource/repositories/IPostRepository';
import AvailableNewsSources from '@modules/technewsSource/infra/crosscutting/repositories';

//
import ITechSourcePost from '@modules/techSource/repositories/IPostRepository';
import TechChannelsBR from '@modules/techSource/infra/crosscutting/repositories/TechChannelsBR';
import MeetUp from '@modules/techSource/infra/crosscutting/repositories/MeetUp';
import ReactBR from '@modules/techSource/infra/crosscutting/repositories/ReactBR';
import YtAbout from '@modules/techSource/infra/crosscutting/repositories/YtAbout';
import Movie from '@modules/techSource/infra/crosscutting/repositories/Movie';

//
import IEngineRepository from '@modules/magnetSource/repositories/IEngineRepository';
import AvailableMagnetSources from '@modules/magnetSource/infra/crosscutting/repositories';

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

//
//
//
Object.values(AvailableNewsSources).map((source: ITechNewsSourcePost) => 
  container.registerSingleton<ITechNewsSourcePost>('TechNewsSource', source)
);

//
//
//
Object.values(AvailableMagnetSources).map((source) => 
  container.registerSingleton<IEngineRepository>('EngineSource', source)
);

//
//
//
container.registerSingleton<ITechSourcePost>('YtAboutSource', YtAbout);
container.registerSingleton<ITechSourcePost>('TechSource', TechChannelsBR);
container.registerSingleton<ITechSourcePost>('ReactBRSource', ReactBR);
container.registerSingleton<ITechSourcePost>('TechSource', TechChannelsBR);
container.registerSingleton<ITechSourcePost>('MovieSource', Movie);
container.registerSingleton<ITechSourcePost>('MeetUpSource', MeetUp);

container.registerSingleton<IPlanetPostsRepository>(
  'GalleryRepository',
  PlanetPostsRepository,
);

container.registerSingleton<IPlanetHistoryRepository>(
  'GalleryHistoryRepository',
  PlanetHistoryRepository,
);

container.registerSingleton<IPlanetSourcePost>('PlanetSource', PlanetSuzy);
