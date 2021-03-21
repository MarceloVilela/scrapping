import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TechChannelsBRController from '../controllers/TechChannelsBRController';
import MeetUpController from '../controllers/MeetUpController';
import ReactBRController from '../controllers/ReactBRController';
import YtAboutController from '../controllers/YtAboutController';
import MoviesController from '../controllers/MoviesController';

const techRouter = Router();
const channelsBRController = new TechChannelsBRController();
const meetUpController = new MeetUpController();
const reactBRController = new ReactBRController();
const ytAboutController = new YtAboutController();
const moviesController = new MoviesController();

// appointmentsRouter.use(ensureAuthenticated);

techRouter.get(
  // #swagger.tags = ['TechSource']
  // #swagger.path = '/v1/tech-source/channels/br'
  // #swagger.summary = 'Get array of technology channels on youtube (in PT-BR)'
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechSource_ArrayOfChannels" },
  } */
  '/channels/br', channelsBRController.index
);

techRouter.get(
  // #swagger.tags = ['TechSource']
  // #swagger.path = '/v1/tech-source/meetups'
  // #swagger.summary = 'Get array of technology meetups'
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechSource_ArrayOfMeetups" },
  } */
  '/meetups', meetUpController.index
);

techRouter.get(
  // #swagger.tags = ['TechSource']
  // #swagger.path = '/v1/tech-source/react/br'
  // #swagger.summary = 'Get array of companies that use react in brazil'
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechSource_ArrayOfCompanies" },
  } */
  '/react/br', reactBRController.index
);

techRouter.get(
  // #swagger.tags = ['TechSource']
  // #swagger.path = '/v1/tech-source/yt/about'
  // #swagger.summary = 'Get info about youtube channel'
  /* #swagger.parameters['url'] = {
    in: 'query',
    description: 'url of post in source website',
    type: 'string',
    default: 'https://www.youtube.com/engenhariareversa'
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechSource_YtAbout" },
  } */
  '/yt/about', ytAboutController.index
);

techRouter.get(
  // #swagger.tags = ['TechSource']
  // #swagger.path = '/v1/tech-source/movies'
  // #swagger.summary = 'Get array of movies for ...'
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/TechSource_ArrayOfMovies" },
  } */
  '/movies', moviesController.index
);

export default techRouter;
