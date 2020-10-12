import { JSDOM } from 'jsdom';

import IPostsRepository from '@modules/techSource/repositories/IPostRepository';
import IShowPostDTO from '@modules/techSource/dtos/IShowPostDTO';
import AppError from '@shared/errors/AppError';
import ChannelData from '../schemas/ChannelData';

class TechChannelsBR implements IPostsRepository {
  getOriginUrl(): string {
    return 'https://github.com/carolcodes/videos-pt.br-tecnologia';
  }

  async getPost({ url }: IShowPostDTO): Promise<ChannelData[]> {
    console.log(`@Tech-Channel/getPost()/url:${url}`);
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const getContent = (el: Element) => {
      const elAText = String(el.querySelector('a')?.textContent);
      const elEmText = String(el.querySelector('em')?.textContent);

      return {
        link: String(el.querySelector('a')?.getAttribute('href')),
        title: String(el.querySelector('a')?.textContent),
        description: String(el.textContent
          ?.replace(elAText, '')
          .replace(elEmText, '')
          .replace(/^\s-\s/, '')
          .replace(/\s$/, '')),
        tags: [...el.querySelectorAll('em code')]
          .map(tag => String(tag.textContent)),
        category: String(el.closest('ul')?.previousElementSibling?.textContent),
      }

    }

    const posts = [...document.querySelectorAll('.markdown-body h3+ul li')]
      .map(elPost => getContent(elPost))
      .filter(item => ('link' in item))

    return posts;
  }
}

export default TechChannelsBR;
