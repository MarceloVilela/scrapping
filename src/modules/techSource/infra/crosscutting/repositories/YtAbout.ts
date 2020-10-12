import { JSDOM } from 'jsdom';

import IYtAboutRepository from '@modules/techSource/repositories/IYtAboutRepository';
import YtAboutData from '../schemas/YtAboutData';
import IYtAboutDTO from '../../../dtos/IYtAboutDTO';

class YtAbout implements IYtAboutRepository {

  async getAbout({ url }: IYtAboutDTO): Promise<YtAboutData> {
    console.log(`@Yt-About/getAbout()/url:${url}`);
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    // sample: https://www.youtube.com/engenhariareversa
    let el = document.querySelector('meta[property="og:image"]');
    let profileImage = el ? el.getAttribute('content') : '';

    if (url.includes('/channel') || url.includes('/c/')) {
      el = document.querySelector('meta[property="og:image"]');
      profileImage = el ? el.getAttribute('content') : '';
    }

    if (url.includes('/user')) {
      el = document.querySelector('meta[property="og:image"]');
      profileImage = el ? el.getAttribute('content') : '';
    }

    if (url.includes('/playlist')) {
      el = document.querySelector('meta[property="og:image"]');
      profileImage = el ? el.getAttribute('content') : '';
    }

    return {
      profileImage: String(profileImage)
    };
  }
}

export default YtAbout;
