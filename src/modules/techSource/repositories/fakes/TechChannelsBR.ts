import { JSDOM } from 'jsdom';

import ITechChannelsBRRepository from '@modules/techSource/repositories/ITechChannelsBRRepository';
import IShowPostDTO from '@modules/techSource/dtos/IShowPostDTO';
import AppError from '@shared/errors/AppError';
import ChannelData from '@modules/techSource/infra/crosscutting/schemas/ChannelData';

class TechChannelsBR implements ITechChannelsBRRepository {
  getOriginUrl(): string {
    return 'https://github.com/carolcodes/videos-pt.br-tecnologia';
  }

  async getPost({ url }: IShowPostDTO): Promise<ChannelData[]> {
    const response = await JSDOM.fromFile(`./src/assets/fakes/html/tech-source/channels-br/channels-br.html`);
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
