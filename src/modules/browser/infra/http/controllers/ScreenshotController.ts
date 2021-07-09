import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GenerateScreenshotService from '@modules/browser/services/GenerateScreenshot';

type KeyValue = {
  [key: string]: string
};

export default class ScreenshotController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { browserUrl, browserPosY, ...rest } = request.query;

    const queryParams = rest as KeyValue;
    const queryStringRest = new URLSearchParams(queryParams).toString();

    const yCommaSplitted = Array.from(String(browserPosY).split(','));
    const yNumericPositions = yCommaSplitted.map(item => Number(item));

    const generatePrint = container.resolve(GenerateScreenshotService);
    const listPrintUrls = await generatePrint.execute({ url: String(browserUrl), scrollToY: yNumericPositions, queryStringRest });

    return response.json(listPrintUrls);
  }
}
