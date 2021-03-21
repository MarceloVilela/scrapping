import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SearchController from '../controllers/SearchController';

const magnetRouter = Router();
const searchController = new SearchController();

// appointmentsRouter.use(ensureAuthenticated);

magnetRouter.get(
// #swagger.tags = ['MagnetSource']
  // #swagger.path = '/v1/magnet-source/search'
  // #swagger.summary = 'Get array of results'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'alias from source site',
    type: 'string',
    default: 'pirateproxy'
  } */
  /* #swagger.parameters['search_query'] = {
    in: 'query',
    description: 'search parameter',
    type: 'string',
    default: 'snes'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/MagnetSource_ArrayOfResults" },
  } */
  '/search',
  searchController.index
);

export default magnetRouter;
