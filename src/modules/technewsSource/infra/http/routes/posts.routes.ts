import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';
import HomePageController from '../controllers/HomePageController';

const sourceRouter = Router();
const postsController = new PostsController();
const homePageController = new HomePageController();

// sourceRouter.use(ensureAuthenticated);

sourceRouter.get(
  // #swagger.tags = ['TechNewsSource']
  // #swagger.path = '/v1/technews-source/'
  // #swagger.summary = 'Get previews of posts on homepage of source website'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'url of source website',
    type: 'string',
    default: 'https://tecnoblog.net'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechNewsSource_Previews" },
  } */
  '/',
  celebrate({
    [Segments.QUERY]: {
      url: Joi.string().uri().required()
    }
  }), homePageController.index
);

sourceRouter.get(
  // #swagger.tags = ['TechNewsSource']
  // #swagger.path = '/v1/technews-source/detail'
  // #swagger.summary = 'Get full post data'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'url of post in source website',
    type: 'string',
    default: 'https://tecnoblog.net/398460/google-chrome-prepara-mudanca-para-abrir-sites-mais-rapido/'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechNewsSource_Detail" },
  } */
  '/detail',
  celebrate({
    [Segments.QUERY]: {
      url: Joi.string().uri().required()
    }
  }),
  postsController.index
);

export default sourceRouter;
