import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';
import HomePageController from '../controllers/HomePageController';

const sourceRouter = Router();
const postsController = new PostsController();
const homePageController = new HomePageController();

// sourceRouter.use(ensureAuthenticated);

sourceRouter.get('/', homePageController.index);
sourceRouter.get('/detail', postsController.index);

export default sourceRouter;
