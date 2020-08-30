import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

// https://medium.com/@alexalvess/criando-uma-api-em-net-core-baseado-na-arquitetura-ddd-2c6a409c686
// https://pt.stackoverflow.com/questions/82976/oque-%C3%A9-cross-cutting-e-qual-sua-rela%C3%A7%C3%A3o-com-aspect-oriented-programming-aop
class TecnoBlog implements IArticlesRepository {
  getOriginUrl(): string {
    return 'https://tecnoblog.net';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    console.log(`@TecnoBlog/getHome()/url:${url}`);
    const response = await JSDOM.fromURL(`${url}/noticias`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      const elInfoDate = elPost.querySelector('.info');
      const textualDate = elInfoDate ? String(elInfoDate.textContent) : '';
      const created_at = textualDate.split(' por')[0];

      return {
        link: elPost.querySelector('h2 a')?.getAttribute('href'),
        title: elPost.querySelector('h2')?.textContent,
        thumb:
          this.getOriginUrl() +
          elPost
            .querySelector('img[data-lazy-src]')
            ?.getAttribute('data-lazy-src'),
        // preview: '',
        created_at,
      }
    };

    const postsData = [...document.querySelectorAll('article.bloco'),]
      .map(elPost => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    console.log(`@TecnoBlog/getPost()/url:${url}`);
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document.querySelector('h1.title a')?.getAttribute('href');

    const title = document.querySelector('h1.title a')?.textContent;

    const imgSrc = document
      .querySelector('.entry p img')
      ?.getAttribute('data-lazy-srcset')

    const [thumb] = String(imgSrc).split(' ');

    const getContent = (el: Element) => {
      if (
        el.querySelector('img') !== null &&
        el.querySelector('img')?.getAttribute('data-lazy-srcset')
      ) {
        const [img] = String(el.querySelector('img')?.getAttribute('data-lazy-srcset'))
          .split(' ');

        if (img !== thumb) {
          // return {
          //  type: 'image',
          //  content: img,
          // };
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

    const contents = Array.from(document.querySelectorAll('.entry *'))
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

export default TecnoBlog;