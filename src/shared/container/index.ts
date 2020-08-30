import { container } from 'tsyringe';

import '@modules/users/providers';
import '../providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
//
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

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

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
