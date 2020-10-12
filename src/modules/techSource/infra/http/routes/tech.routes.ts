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

techRouter.get('/channels/br', channelsBRController.index);
techRouter.get('/meetups', meetUpController.index);
techRouter.get('/react/br', reactBRController.index);
techRouter.get('/yt/about', ytAboutController.index);
techRouter.get('/movies', moviesController.index);

export default techRouter;
