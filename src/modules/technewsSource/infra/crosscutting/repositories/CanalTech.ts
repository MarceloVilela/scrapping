import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class CanalTech implements IArticlesRepository {
  getOriginUrl(): string {
    return 'https://canaltech.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    console.log(`@CanalTech/getHome()/url:${url}`);
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: `${url}${elPost.getAttribute('href')}`,
        title: elPost.querySelector('.item-info .title') !== null
          ? elPost.querySelector('.item-info .title')?.textContent
          : elPost.querySelector('h3')?.textContent,
        thumb: elPost.querySelector('[data-src-full]') !== null
          ? elPost.querySelector('[data-src-full]')?.getAttribute('data-src-full')
          : '',
        created_at: ''
      }
    };

    const postsData = [...document.querySelectorAll('#list.listagem-colunas .list-item'),]
      .map(elPost => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    console.log(`@CanalTech/getPost()/url:${url}`);
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    const title = document.querySelector('.timeline-wrapper h1.title')?.textContent;

    const thumb = document
      .querySelector('.head-cover-img')
      ?.getAttribute('style')
      ?.split('("')[1]
      ?.split('")')[0];

    const getContent = (el: Element) => {
      if (
        el.querySelector('img') !== null &&
        el.querySelector('img')?.getAttribute('data-lazy-srcset')
      ) {
        const [img] = String(el.querySelector('img')?.getAttribute('data-lazy-srcset'))
          .split(' ');

        if (img !== thumb) {
          return {
            type: 'image',
            content: img,
          };
        }
        return {};
      }
      if (el.querySelector('.video-container') !== null) {
        return {
          type: 'video',
          content: el
            .querySelector('.video-container iframe')
            ?.getAttribute('data-src'),
        };
      }
      if (
        el.tagName === 'P' &&
        el.getAttribute('class') === null &&
        el.getAttribute('id') === null
      ) {
        return { type: 'text', content: el.textContent };
      }
      if (el.tagName === 'H3') {
        return { type: 'text-highlighted', content: el.textContent };
      }
      return {};
    };

    const contents = Array.from(document.querySelectorAll('div.content > *'))
      .map((elPost) => getContent(elPost))
      .map((dataPost) => ({
        type: String(dataPost.type),
        value: String(dataPost.content),
      }));

    const post = {
      link: String(link),
      title: String(title),
      thumb: String(thumb),
      contents,
      created_at: new Date(),
    };

    return post;
  }
}

export default CanalTech;
