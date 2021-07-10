import { IShowScreenshotDTO } from '@modules/browser/dtos/IShowScreenshotDTO';
import IBrowserRepository from '@modules/browser/repositories/repositories/IBrowserRepository';
import { firefox, Page } from 'playwright-firefox';
//import { storeImage } from './Imgur';
import ImageStorageProvider from '@shared/providers/StorageImageProvider/implementations/ImageStorageProvider';

const img = new ImageStorageProvider();

const today = new Date();
const getDateTime = () => today.toISOString().substring(0, 19).replace(/:/g, '-').replace('T', '_');

const storeScreenshot = async (page: Page, fileName: string) => {
  const buffer = await page.screenshot();
  const base64 = buffer.toString('base64');
  return await img.storeImage({ base64, fileName });
};

//class TecnoBlog implements IArticlesRepository {
class Firefox implements IBrowserRepository {
  //async getHome(): Promise<IResponseHomeDTO> {
  async getScreenshots({ url, scrollToY, queryStringRest }: IShowScreenshotDTO): Promise<string[]> {
    console.log(`function screenshot | ${url}?${queryStringRest} | ${scrollToY.join(',')}`);

    const browser = await firefox.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage({
      colorScheme: 'dark',
      viewport: {
        width: 1152,
        height: 950,
      }
    });
    await page.goto(`${url}?${queryStringRest}`);

    let urls = [];

    for (let i = 0; i < scrollToY.length; i++) {
      const y = scrollToY[i];
      console.log('pos', y);

      await page.evaluate(y => {
        window.scrollTo(0, Number(y));
      }, y);
      urls.push(await storeScreenshot(page, getDateTime() + i));
    }

    await browser.close();

    return urls;
  }
}

export default Firefox;
