import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class ExameTecnologia implements IArticlesRepository {
  getOriginUrl(): string {
    return 'https://exame.com/tecnologia';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    console.log(`@ExameTecnologia/getHome()/url:${url}`);
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector('.list-item-title a')?.getAttribute('href'),
        title: elPost.querySelector('.list-item-title')?.textContent,
        thumb: elPost.querySelector('.image img')?.getAttribute('data-src'),
        created_at: elPost.querySelector('.list-date-description')?.textContent
      }
    };

    const postsData = [...document.querySelectorAll('.articles-list .list-item')]
      .map(elPost => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    console.log(`@ExameTecnologia/getPost()/url:${url}`);
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    const title = document.querySelector('h1.article-title')?.textContent;

    const thumb = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

    const created_at = document.querySelector('.article-date')?.textContent?.split('em: ')[1]?.split('\n')[0];

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

    const contents = Array.from(document.querySelectorAll('.article-content *'))
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

export default ExameTecnologia;
