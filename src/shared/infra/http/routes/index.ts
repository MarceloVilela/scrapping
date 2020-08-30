import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
//
import technewsRouter from '@modules/technews/infra/http/routes/posts.routes';
import technewsSourceRouter from '@modules/technewsSource/infra/http/routes/posts.routes';
//
import planetRouter from '@modules/planet/infra/http/routes/posts.routes';
import planetSourceRouter from '@modules/planetSource/infra/http/routes/posts.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
//
routes.use('/technews', technewsRouter);
routes.use('/technews-source', technewsSourceRouter);

routes.use('/planet', planetRouter);
routes.use('/planet-source', planetSourceRouter);

export default routes;
