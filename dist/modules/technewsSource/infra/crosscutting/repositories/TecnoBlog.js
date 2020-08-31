"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsdom = require("jsdom");

// https://medium.com/@alexalvess/criando-uma-api-em-net-core-baseado-na-arquitetura-ddd-2c6a409c686
// https://pt.stackoverflow.com/questions/82976/oque-%C3%A9-cross-cutting-e-qual-sua-rela%C3%A7%C3%A3o-com-aspect-oriented-programming-aop
class TecnoBlog {
  getOriginUrl() {
    return 'https://tecnoblog.net';
  }

  async getHome() {
    const url = this.getOriginUrl();
    console.log(`@TecnoBlog/getHome()/url:${url}`);
    const response = await _jsdom.JSDOM.fromURL(`${url}/noticias`);
    const {
      document
    } = response.window;

    const getContent = elPost => {
      var _elPost$querySelector, _elPost$querySelector2, _elPost$querySelector3;

      const elInfoDate = elPost.querySelector('.info');
      const textualDate = elInfoDate ? String(elInfoDate.textContent) : '';
      const created_at = textualDate.split(' por')[0];
      return {
        link: (_elPost$querySelector = elPost.querySelector('h2 a')) === null || _elPost$querySelector === void 0 ? void 0 : _elPost$querySelector.getAttribute('href'),
        title: (_elPost$querySelector2 = elPost.querySelector('h2')) === null || _elPost$querySelector2 === void 0 ? void 0 : _elPost$querySelector2.textContent,
        thumb: this.getOriginUrl() + ((_elPost$querySelector3 = elPost.querySelector('img[data-lazy-src]')) === null || _elPost$querySelector3 === void 0 ? void 0 : _elPost$querySelector3.getAttribute('data-lazy-src')),
        // preview: '',
        created_at
      };
    };

    const postsData = [...document.querySelectorAll('article.bloco')].map(elPost => getContent(elPost));
    return {
      posts: postsData
    };
  }

  async getPost({
    url
  }) {
    var _document$querySelect, _document$querySelect2, _document$querySelect3;

    console.log(`@TecnoBlog/getPost()/url:${url}`);
    const response = await _jsdom.JSDOM.fromURL(url);
    const {
      document
    } = response.window;
    const link = (_document$querySelect = document.querySelector('h1.title a')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('href');
    const title = (_document$querySelect2 = document.querySelector('h1.title a')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.textContent;
    const imgSrc = (_document$querySelect3 = document.querySelector('.entry p img')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.getAttribute('data-lazy-srcset');
    const [thumb] = String(imgSrc).split(' ');

    const getContent = el => {
      var _el$querySelector;

      if (el.querySelector('img') !== null && ((_el$querySelector = el.querySelector('img')) === null || _el$querySelector === void 0 ? void 0 : _el$querySelector.getAttribute('data-lazy-srcset'))) {
        var _el$querySelector2;

        const [img] = String((_el$querySelector2 = el.querySelector('img')) === null || _el$querySelector2 === void 0 ? void 0 : _el$querySelector2.getAttribute('data-lazy-srcset')).split(' ');

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

    const contents = Array.from(document.querySelectorAll('.entry *')).map(elPost => getContent(elPost)).map(dataPost => ({
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

var _default = TecnoBlog;
exports.default = _default;