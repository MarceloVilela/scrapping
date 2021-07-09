import { Router } from 'express';

import ScreenshotController from '../controllers/ScreenshotController';

const postsRouter = Router();
const screenshotController = new ScreenshotController();

postsRouter.get('/screenshot', screenshotController.index);

export default postsRouter;
