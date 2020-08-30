import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';
import RefreshController from '../controllers/RefreshController';
import HistoryController from '../controllers/HistoryController';

const planetRouter = Router();
const postsController = new PostsController();
const refreshController = new RefreshController();
const historyController = new HistoryController();

// planetRouter.use(ensureAuthenticated);

planetRouter.post(
  '/',
  /* celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }), */
  postsController.create,
);

planetRouter.get('/refresh', refreshController.index);
planetRouter.post('/refresh', refreshController.create);

planetRouter.post('/history', historyController.create);

planetRouter.get('/', postsController.index);
planetRouter.get('/:id', postsController.show);

export default planetRouter;
