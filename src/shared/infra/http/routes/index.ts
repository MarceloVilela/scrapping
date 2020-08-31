import { Router } from 'express';

import technewsRouter from '@modules/technews/infra/http/routes/posts.routes';
import technewsSourceRouter from '@modules/technewsSource/infra/http/routes/posts.routes';
//
import planetRouter from '@modules/planet/infra/http/routes/posts.routes';
import planetSourceRouter from '@modules/planetSource/infra/http/routes/posts.routes';

const routes = Router();

routes.use('/technews', technewsRouter);
routes.use('/technews-source', technewsSourceRouter);

routes.use('/planet', planetRouter);
routes.use('/planet-source', planetSourceRouter);

export default routes;
