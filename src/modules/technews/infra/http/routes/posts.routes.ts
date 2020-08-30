import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';
import RefreshController from '../controllers/RefreshController';

const postsRouter = Router();
const postsController = new PostsController();
const refreshController = new RefreshController();

// appointmentsRouter.use(ensureAuthenticated);

postsRouter.post(
  '/',
  /* celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }), */
  postsController.create,
);

postsRouter.get('/post/origin', postsController.index);

postsRouter.get('/post', postsController.show);

postsRouter.get('/refresh', refreshController.index);

export default postsRouter;
