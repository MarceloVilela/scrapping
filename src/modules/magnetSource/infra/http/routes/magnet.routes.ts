import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SearchController from '../controllers/SearchController';

const magnetRouter = Router();
const searchController = new SearchController();

// appointmentsRouter.use(ensureAuthenticated);

magnetRouter.get('/search', searchController.index);

export default magnetRouter;
