"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsdom = require("jsdom");

class Tecmundo {
  getOriginUrl() {
    return 'https://www.tecmundo.com.br';
  }

  async getHome() {
    const url = this.getOriginUrl();
    console.log(`@TecMundo/getHome()/url:${url}`);
    const response = await _jsdom.JSDOM.fromURL(url);
    const {
      document
    } = response.window;

    const getContent = elPost => {
      var _elPost$querySelector, _elPost$querySelector2, _elPost$querySelector3, _elPost$querySelector4;

      return {
        link: (_elPost$querySelector = elPost.querySelector('h3 a')) === null || _elPost$querySelector === void 0 ? void 0 : _elPost$querySelector.getAttribute('href'),
        title: (_elPost$querySelector2 = elPost.querySelector('h3')) === null || _elPost$querySelector2 === void 0 ? void 0 : _elPost$querySelector2.textContent,
        thumb: (_elPost$querySelector3 = elPost.querySelector('figure img')) === null || _elPost$querySelector3 === void 0 ? void 0 : _elPost$querySelector3.getAttribute('data-src'),
        // preview: '',
        created_at: (_elPost$querySelector4 = elPost.querySelector('.tec--timestamp__item')) === null || _elPost$querySelector4 === void 0 ? void 0 : _elPost$querySelector4.textContent
      };
    };

    const postsData = [...document.querySelectorAll('.tec--list.z--mt-24 .tec--list__item')].map(elPost => getContent(elPost));
    return {
      posts: postsData
    };
  }

  async getPost({
    url
  }) {
    var _document$querySelect, _document$querySelect2, _document$querySelect3;

    console.log(`@TecMundo/getPost()/url:${url}`);
    const response = await _jsdom.JSDOM.fromURL(url);
    const {
      document
    } = response.window;
    const link = (_document$querySelect = document.querySelector('link[rel="canonical"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('href');
    const title = (_document$querySelect2 = document.querySelector('meta[property="og:title"]')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.getAttribute('content');
    const thumb = (_document$querySelect3 = document.querySelector('.tec--article__header figure img')) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.getAttribute('data-src');

    const getContent = el => {
      var _el$querySelector;

      if (el.querySelector('img') !== null && ((_el$querySelector = el.querySelector('img')) === null || _el$querySelector === void 0 ? void 0 : _el$querySelector.getAttribute('data-lazy-srcset'))) {
        var _el$querySelector2;

        const imgSrc = (_el$querySelector2 = el.querySelector('img')) === null || _el$querySelector2 === void 0 ? void 0 : _el$querySelector2.getAttribute('data-lazy-srcset');
        const [img] = imgSrc ? imgSrc.split(' ') : '';

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

    const contents = [...document.querySelectorAll('.tec--article__body *')].map(elPost => getContent(elPost)).map(dataPost => ({
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

var _default = Tecmundo;
exports.default = _default;