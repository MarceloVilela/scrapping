import { Router } from 'express';

import technewsRouter from '@modules/technews/infra/http/routes/posts.routes';
import technewsSourceRouter from '@modules/technewsSource/infra/http/routes/posts.routes';
//
import techSourceRouter from '@modules/techSource/infra/http/routes/tech.routes';
import techRouter from '@modules/tech/infra/http/routes/tech.routes';
//
import magnetSourceRouter from '@modules/magnetSource/infra/http/routes/magnet.routes';
//
import planetRouter from '@modules/planet/infra/http/routes/posts.routes';
import planetSourceRouter from '@modules/planetSource/infra/http/routes/posts.routes';

const routes = Router();

routes.use('/technews', technewsRouter);
routes.use('/technews-source', technewsSourceRouter);

routes.use('/tech', techRouter);
routes.use('/tech-source', techSourceRouter);

routes.use('/magnet-source', magnetSourceRouter);

routes.use('/planet', planetRouter);
routes.use('/planet-source', planetSourceRouter);

export default routes;
