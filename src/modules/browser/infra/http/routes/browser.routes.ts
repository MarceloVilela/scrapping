import { Router } from 'express';

import ScreenshotController from '../controllers/ScreenshotController';

const postsRouter = Router();
const screenshotController = new ScreenshotController();

postsRouter.get(
  // #swagger.tags = ['Browser']
  // #swagger.path = '/v1/browser/screenshot'
  // #swagger.summary = 'Get urls to page screenshot'
  /* #swagger.parameters['browserUrl'] = {
    in: 'query',
    description: 'url of page',
    type: 'string',
    default: 'https://www.youtube.com/'
  } */
  /* #swagger.parameters['browserPosY'] = {
    in: 'query',
    description: 'position of scroll on page (allows comma-separated numbers)',
    type: 'string',
    default: '0',
    required: false
  } */
  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/BrowserScreenshotUrls" },
  } */
  '/screenshot',
  screenshotController.index
);

export default postsRouter;
