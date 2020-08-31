"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsdom = require("jsdom");

class OlharDigital {
  getOriginUrl() {
    return 'https://olhardigital.com.br';
  }

  async getHome() {
    const url = this.getOriginUrl();
    console.log(`@TecMundo/getHome()/url:${url}`);
    const response = await _jsdom.JSDOM.fromURL(`${url}/noticias`);
    const {
      document
    } = response.window;

    const getContent = elPost => ({
      link: `https:${elPost.getAttribute('href')}`,
      title: elPost.querySelector('h3').textContent,
      thumb: `https:` + elPost.querySelector('.ite-img img').getAttribute('data-src'),
      // preview: '',
      created_at: elPost.querySelector('.ite-nfo.nfo-tpo').textContent
    });

    const postsData = [...document.querySelectorAll('.blk-items > a')].map(elPost => getContent(elPost));
    return {
      posts: postsData
    };
  }

  async getPost({
    url
  }) {
    var _document$querySelect, _document$querySelect2;

    const response = await _jsdom.JSDOM.fromURL(url);
    const {
      document
    } = response.window;
    const link = (_document$querySelect = document.querySelector('.fb-comments')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('data-href');
    const title = document.querySelector('h1.mat-tit').textContent;
    const imgSrc = (_document$querySelect2 = document.querySelector('.mat-imagem img')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.getAttribute('srcset');
    const [thumb] = String(imgSrc).split(' ');

    const getContent = el => {
      var _el$querySelector;

      if (el.querySelector('img') !== null && ((_el$querySelector = el.querySelector('img')) === null || _el$querySelector === void 0 ? void 0 : _el$querySelector.getAttribute('data-lazy-srcset'))) {
        var _el$querySelector2;

        const imgSrc = (_el$querySelector2 = el.querySelector('img')) === null || _el$querySelector2 === void 0 ? void 0 : _el$querySelector2.getAttribute('data-lazy-srcset');
        const [img] = String(imgSrc).split(' ');

        if (img !== thumb) {// return {
          //  type: 'image',
          //  content: img,
          // };
        }

        return {};
      }

      if (el.querySelector('.video-container') !== null) {
        var _el$querySelector3;

        return {
          type: 'video',
          content: (_el$querySelector3 = el.querySelector('.video-container iframe')) === null || _el$querySelector3 === void 0 ? void 0 : _el$querySelector3.getAttribute('data-src')
        };
      }

      if (el.tagName === 'P' && el.getAttribute('class') === null && el.getAttribute('id') === null) {
        return {
          type: 'text',
          content: el.textContent
        };
      }

      if (el.tagName === 'H3') {
        return {
          type: 'text-highlighted',
          content: el.textContent
        };
      }

      return {};
    };

    const contents = [...document.querySelectorAll('.mat-txt *')].map(elPost => getContent(elPost)).map(dataPost => ({
      type: String(dataPost.type),
      value: String(dataPost.content)
    }));
    const post = {
      link: String(link),
      title: String(title),
      thumb: String(thumb),
      contents,
      created_at: new Date()
    };
    return post;
  }

}

var _default = OlharDigital;
exports.default = _default;