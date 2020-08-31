"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsdom = require("jsdom");

class PlanetSuzy {
  getOriginUrl() {
    return 'http://www.planetsuzy.org/';
  }

  async getPost({
    url
  }) {
    const response = await _jsdom.JSDOM.fromURL(url);
    const {
      document
    } = response.window;

    const getContent = elPost => {
      const sourceLink = elPost.querySelector('a[id^="postcount"]').getAttribute('href');
      const message = elPost.querySelector('div[id^="post_message"]').textContent;
      const title = message.split('\n')[0] !== '' ? message.split('\n')[0] : message.split('\n').filter(val => val !== '')[0];
      const imagesEl = [...elPost.querySelectorAll('div[id^="post_message"] img')];
      const images = imagesEl.map(img => img.getAttribute('src'));
      const linksEl = [...elPost.querySelectorAll('div[id^="post_message"] a')];
      const linksA = linksEl.filter(item => item.querySelector('img') === null).map(item => item.getAttribute('href'));
      const linksTxt = message.split('\n').filter(val => val.includes('http'));
      const links = [...linksA, ...linksTxt];
      const id = elPost.querySelector('a[id^="postcount"]').textContent.padStart(4, '0');
      const textContent = message.split('\n').filter(val => !val.includes('http') && val !== '' && val !== ' ').join('\n');
      const contents = [{
        text: textContent,
        id
      }];
      const posted_at = elPost.querySelector('td.thead:nth-of-type(1)').textContent.replace(/\n/g, '').replace(/\t/g, '');
      return {
        sourceLink,
        title,
        images,
        links,
        contents,
        // labels: [],
        posted_at
      };
    };

    const posts = [...document.querySelectorAll('table[id]')].map(elPost => {
      const data = getContent(elPost);
      return data;
    });
    const title = document.querySelector('meta[name="description"]').getAttribute('content');
    const pageCurrent = document.querySelector('.pagenav .alt2').textContent;
    let pageLast = 999;

    if (document.querySelector('.pagenav .alt1:last-of-type a') !== null) {
      pageLast = dom.window.document.querySelector('.pagenav .alt1:last-of-type a').getAttribute('href').split('=').pop();
    }

    if (document.querySelector('.pagenav .vbmenu_control') !== null) {
      pageLast = document.querySelector('.pagenav .vbmenu_control').textContent.split(' ').pop();
    }

    return {
      posts,
      title: String(title),
      pageCurrent: Number(pageCurrent),
      pageLast: Number(pageLast)
    };
  }

}

var _default = PlanetSuzy;
exports.default = _default;