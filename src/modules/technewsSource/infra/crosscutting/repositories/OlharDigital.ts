import { JSDOM } from 'jsdom';

import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '@modules/technewsSource/dtos/IResponseHomeDTO';
import Article from '../schemas/Article';

class OlharDigital implements IArticlesRepository {
  getOriginUrl() {
    return 'https://olhardigital.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    console.log(`@TecMundo/getHome()/url:${url}`);
    const response = await JSDOM.fromURL(`${url}/noticias`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: `https:${elPost.getAttribute('href')}`,
      title: elPost.querySelector('h3')!.textContent,
      thumb: `https:` + elPost.querySelector('.ite-img img')!.getAttribute('data-src'),
      // preview: '',
      created_at: elPost.querySelector('.ite-nfo.nfo-tpo')!.textContent,
    });

    const postsData = [...document.querySelectorAll('.blk-items > a'),]
      .map((elPost) => getContent(elPost));

    return { posts: postsData };
  }

  async getPost({ url }: IShowPostDTO): Promise<Article> {
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const link = document
      .querySelector('.fb-comments')
      ?.getAttribute('data-href');

    const title = document.querySelector('h1.mat-tit')!.textContent;

    const imgSrc = document
      .querySelector('.mat-imagem img')
      ?.getAttribute('srcset');
    const [thumb] = String(imgSrc).split(' ');

    const getContent = (el: Element) => {
      if (
        el.querySelector('img') !== null
        && el.querySelector('img')?.getAttribute('data-lazy-srcset')
      ) {
        const imgSrc = el
          .querySelector('img')
          ?.getAttribute('data-lazy-srcset')

        const [img] = String(imgSrc).split(' ');
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
        el.tagName === 'P'
        && el.getAttribute('class') === null
        && el.getAttribute('id') === null
      ) {
        return { type: 'text', content: el.textContent };
      }
      if (el.tagName === 'H3') {
        return { type: 'text-highlighted', content: el.textContent };
      }
      return {};
    };

    const contents = [...document.querySelectorAll('.mat-txt *')]
      .map(elPost => getContent(elPost))
      .map(dataPost => ({
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

export default OlharDigital;
