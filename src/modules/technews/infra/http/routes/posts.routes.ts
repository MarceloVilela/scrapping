import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';
import RefreshController from '../controllers/RefreshController';

const postsRouter = Router();
const postsController = new PostsController();
const refreshController = new RefreshController();

// appointmentsRouter.use(ensureAuthenticated);

postsRouter.post('/post', celebrate({
    [Segments.BODY]: {
        link: Joi.string().uri().required(),
        title: Joi.string().required(),
        thumb: Joi.string().uri().required(),
        contents: Joi.array().items(Joi.object().keys({
            type: Joi.string().valid('text', 'text-highlighted', 'image', 'video').required(),
            value: Joi.string().required(),
        })),
        created_at: Joi.date(),
    }
}), postsController.create);

postsRouter.get('/post/origin', celebrate({
    [Segments.QUERY]: {
        url: Joi.string().uri().required().allow(''),
        page: Joi.number(),
    }
}), postsController.index);

postsRouter.get('/post', celebrate({
    [Segments.QUERY]: {
        url: Joi.string().uri().required(),
    }
}), postsController.show);

postsRouter.post('/refresh', celebrate({
    [Segments.BODY]: Joi.array().items(Joi.object().keys({
        link: Joi.string().uri().required()
    }))
}), refreshController.index);

export default postsRouter;
