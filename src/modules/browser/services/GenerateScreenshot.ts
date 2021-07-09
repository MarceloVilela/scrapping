import { injectable, inject } from 'tsyringe';

import IBrowserRepository from '@modules/browser/repositories/repositories/IBrowserRepository';
import { IShowScreenshotDTO } from '@modules/browser/dtos/IShowScreenshotDTO';

@injectable()
class GenerateScreenshotService {
  constructor(
    @inject('Browser')
    private browser: IBrowserRepository,
  ) { }

  public async execute({
    url,
    scrollToY,
    queryStringRest
  }: IShowScreenshotDTO): Promise<string[]> {

    const post = await this.browser.getScreenshots({
      url, scrollToY, queryStringRest
    });

    return post;
  }
}

export default GenerateScreenshotService;
