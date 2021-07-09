import { IShowScreenshotDTO } from '@modules/browser/dtos/IShowScreenshotDTO';

export default interface IBrowserRepository {
  getScreenshots(data: IShowScreenshotDTO): Promise<string[]>;
};
