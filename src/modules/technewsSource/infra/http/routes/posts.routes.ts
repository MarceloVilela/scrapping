import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';
import HomePageController from '../controllers/HomePageController';

const sourceRouter = Router();
const postsController = new PostsController();
const homePageController = new HomePageController();

// sourceRouter.use(ensureAuthenticated);

sourceRouter.get('/', celebrate({
    [Segments.QUERY]: {
        url: Joi.string().uri().required()
    }
}), homePageController.index);

sourceRouter.get('/detail', celebrate({
    [Segments.QUERY]: {
        url: Joi.string().uri().required()
    }
}), postsController.index);

export default sourceRouter;
