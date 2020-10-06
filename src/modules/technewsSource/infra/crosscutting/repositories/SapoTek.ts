import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class SapoTek implements IArticlesRepository {
  getOriginUrl(): string {
    return 'https://tek.sapo.pt';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      const created_at_timestamp = elPost.querySelector('[data-timestamp]')?.getAttribute('data-timestamp');
      return {
        link: `${this.getOriginUrl()}${elPost?.querySelector('.title a')?.getAttribute('href')}`,
        title: elPost?.querySelector('.title')?.textContent,
        thumb: `https:${elPost.querySelector('picture')?.getAttribute('data-original-src')}`,
        created_at: new Date(Number(created_at_timestamp) * 1000).toString(),
      }
    };

    const postsData = [...document.querySelectorAll('.article-list.communist .article')]
      .filter(elPost => 
        elPost?.querySelector('.title a') 
        && elPost.querySelector('picture')
        && !elPost?.querySelector('.title a')?.getAttribute('href')?.includes('https://desporto.sapo.pt')
      )
      .map(elPost => getContent(elPost))

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content');

    const thumb = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

    const created_at = document.querySelector('.date')?.textContent;

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
      if (el.getAttribute('class')?.includes('videoWrapper') && el.querySelector('iframe')?.getAttribute('src') !== null) {
        return {
          type: 'video',
          content: el
            .querySelector('iframe')
            ?.getAttribute('src'),
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

    const contents = Array.from(document.querySelectorAll('.content *'))
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
      created_at: String(created_at),
    };

    return post;
  }
}

export default SapoTek;
