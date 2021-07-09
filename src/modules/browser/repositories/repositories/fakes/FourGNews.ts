import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '@modules/technewsSource/dtos/Article';

const fakeAlias = 'FourGNews';

class FourGNews implements IArticlesRepository {
  getOriginUrl(): string {
    return 'https://4gnews.pt';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromFile(`./src/assets/fakes/html/technews-source/home/${fakeAlias}.html`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: this.getOriginUrl() + elPost.getAttribute('href'),
        title: elPost?.getAttribute('title'),
        thumb: elPost.querySelector('img.thumb')?.getAttribute('src'),
        created_at: elPost.querySelector('time')?.textContent
      }
    };

    const postsData = [...document.querySelectorAll('.ncl-list-miur .post-list')]
      .map(elPost => getContent(elPost))

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const response = await JSDOM.fromFile(`./src/assets/fakes/html/technews-source/post/${fakeAlias}.html`);
    const { document } = response.window;

    const link = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content');

    const thumb = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

    const created_at = document.querySelector('[datetime]')?.getAttribute('datetime');
    
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

    const contents = Array.from(document.querySelectorAll('.article--body *'))
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
      created_at: created_at ? new Date(created_at) : '',
    };

    return post;
  }
}

export default FourGNews;
