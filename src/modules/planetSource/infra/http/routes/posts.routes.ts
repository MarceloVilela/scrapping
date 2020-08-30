import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';

const appointmentsRouter = Router();
const postsController = new PostsController();

// appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', postsController.index);

export default appointmentsRouter;
