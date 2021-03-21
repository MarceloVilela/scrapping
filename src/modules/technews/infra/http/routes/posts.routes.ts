import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';
import RefreshController from '../controllers/RefreshController';

const postsRouter = Router();
const postsController = new PostsController();
const refreshController = new RefreshController();

postsRouter.post(
  // #swagger.tags = ['TechNews (stored)']
  // #swagger.path = '/v1/technews/post'
  // #swagger.summary = 'Create post'
  /* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'A JSON object containing data for the post',
    type: 'object',
    schema: { $ref: "#/definitions/TechNewsSource_Detail" }
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechNews_PostDetail" },
  } */
  '/post',
  celebrate({
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
  }),
  postsController.create
);

postsRouter.get(
  // #swagger.tags = ['TechNews (stored)']
  // #swagger.path = '/v1/technews/post/origin'
  // #swagger.summary = 'Get previews of stored posts by source'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'url of source website',
    type: 'string',
    default: 'https://tecnoblog.net'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechNews_PostPagination" },
  } */
  '/post/origin',
  celebrate({
    [Segments.QUERY]: {
      url: Joi.string().uri().required().allow(''),
      page: Joi.number(),
    }
  }),
  postsController.index
);

postsRouter.get(
  // #swagger.tags = ['TechNews (stored)']
  // #swagger.path = '/v1/technews/post'
  // #swagger.summary = 'Get full data of stored post'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'url of post',
    type: 'string',
    default: 'https://tecnoblog.net/398460/google-chrome-prepara-mudanca-para-abrir-sites-mais-rapido/'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechNewsSource_Detail" },
  } */
  '/post',
  celebrate({
    [Segments.QUERY]: {
      url: Joi.string().uri().required(),
    }
  }),
  postsController.show
);

postsRouter.delete(
  // #swagger.tags = ['TechNews (stored)']
  // #swagger.path = '/v1/technews/post'
  // #swagger.summary = 'Remove post as filter'
  /* #swagger.parameters['title'] = {
    in: 'query',
    description: 'title of post',
    type: 'string',
  } */
  /* #swagger.parameters['thumb'] = {
    in: 'query',
    description: 'thumb of post',
    type: 'string',
    default: 'https:null'
  } */
  /* #swagger.responses[200] = {
    type: 'string',
    example: '0 affected rows',
    default: 'undefined'
  } */
  '/post',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string(),
      thumb: Joi.string(),
    }
  }),
  postsController.delete
);

postsRouter.post(
  // #swagger.tags = ['TechNews (stored)']
  // #swagger.path = '/v1/technews/refresh'
  // #swagger.summary = 'Check which posts are not yet registered'
  /* #swagger.parameters['obj'] = {
    in: 'body',
    description: 'A JSON object containing list of urls to be checked',
    type: 'object',
    schema: { $ref: "#/definitions/TechNews_RefreshParam" }
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechNews_RefreshResponse" },
    description: 'A JSON object containing posts are not yet registered'
  } */
  '/refresh',
  celebrate({
    [Segments.BODY]: Joi.array().items(Joi.object().keys({
      link: Joi.string().uri().required()
    }))
  }),
  refreshController.index
);

export default postsRouter;
