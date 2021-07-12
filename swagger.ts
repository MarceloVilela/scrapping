require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './src/shared/infra/http/routes/index.ts',
  './src/modules/technews/infra/http/routes/posts.routes.ts',
  './src/modules/technewsSource/infra/http/routes/posts.routes.ts',
  './src/modules/techSource/infra/http/routes/tech.routes.ts',
  './src/modules/magnetSource/infra/http/routes/magnet.routes.ts',
  './src/modules/browser/infra/http/routes/browser.routes.ts'
]

const doc = {
  info: {
    version: "1.0.0",
    title: "Scrapping",
    description: "API for scrape: news, content about technology; magnetic links",
  },
  host: process.env.APP_API_HOST,
  basePath: "",
  schemes: process.env.APP_API_HOST?.includes('https') ? ['https', 'http'] : ['https', 'http'],
  /*
  openapi: "3.0.0",
  servers: [
    {
      url: "http://localhost:3333",
      description: "Dev server"
    },
    {
      url: "https://devfinder-api.herokuapp.com/",
      description: "Staging server"
    }
  ],
  */
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",       // can be "header", "query" or "cookie"
      name: "authorization",  // name of the header, query parameter or cookie
      description: "Standard Authorization header using the Bearer scheme. Example: \"bearer {token}\"",
      token: "aaa"
    }
  },
  //security: { "apiKeyAuth": [] },
  definitions: {
    TechNewsSource_Detail: {
      "link": "https://tecnoblog.net/398460/google-chrome-prepara-mudanca-para-abrir-sites-mais-rapido/",
      "title": "Google Chrome prepara mudança para abrir sites mais rápido",
      "thumb": "https://tecnoblog.net/wp-content/uploads/2021/01/google-chrome-tecnoblog-700x396.png",
      "contents": [
        {
          "type": "text",
          "value": "O Google está discutindo internamente uma mudança que pode tornar mais rápida a abertura de alguns sites dentro do Chrome. A alteração faz o browser do gigante das buscas priorizar a versão HTTPS da página digitada na barra de endereços e ela afetará até mesmo usuários do Microsoft Edge."
        },
        {
          "type": "text",
          "value": "A discussão que revela a preparação para este recurso foi encontrada no fórum Chromium Gerrit, local onde os desenvolvedores trocam figurinhas sobre novas funções e implementações futuras e que ainda estão no papel – longe até mesmo da versão beta do Chrome."
        }
      ],
      "created_at": "2021-01-04T14:04:02.000Z"
    },
    TechNewsSource_Previews: {
      "posts": [
        {
          "link": "https://tecnoblog.net/409264/anatel-libera-troca-de-telefone-fixo-por-celular-em-3-mil-cidades/",
          "title": "Anatel libera troca de telefone fixo por celular em 3 mil cidades",
          "thumb": "https://tecnoblog.net/wp-content/uploads/2020/08/telefone-fixo-george-chandrinos-pixabay-scaled-e1596559953125-700x394-340x191.jpg",
          "created_at": "2021-02-05T18:20:30.524Z"
        },
        {
          "link": "https://tecnoblog.net/409256/uber-flash-rival-rappi-loggi-chega-a-todo-brasil/",
          "title": "Uber Flash, rival da Rappi e Loggi, chega a todo o Brasil",
          "thumb": "https://tecnoblog.net/wp-content/uploads/2021/02/uber-flash-iphone-700x394-340x191.jpg",
          "created_at": "2021-02-05T17:57:30.524Z"
        }]
    },
    TechNews_PostDetail: {
      "id": "604fb418c0194e2d883213d7",
      "link": "https://tecnoblog.net/398460/google-chrome-prepara-mudanca-para-abrir-sites-mais-rapido/",
      "title": "Google Chrome prepara mudança para abrir sites mais rápido",
      "thumb": "https://tecnoblog.net/wp-content/uploads/2021/01/google-chrome-tecnoblog-700x396.png",
      "created_at": "2021-01-04T19:29:01.817Z",
      "posted_at": "2021-01-04T14:04:02.000Z",
      "contents": [
        {
          "type": "text",
          "value": "A discussão que revela a preparação para este recurso foi encontrada no fórum Chromium Gerrit, local onde os desenvolvedores trocam figurinhas sobre novas funções e implementações futuras e que ainda estão no papel – longe até mesmo da versão beta do Chrome."
        }
      ]
    },
    TechNews_PostPagination: {
      "data": [
        {
          "id": "60494b28b8eba3001764f3ae",
          "link": "https://tecnoblog.net/420068/amazon-prepara-robo-domestico-vesta-com-alexa-embutida/",
          "title": "Amazon prepara robô doméstico Vesta com Alexa embutida",
          "thumb": "https://tecnoblog.net/wp-content/uploads/2020/04/amazon-echo-show-8-alexa-review-1-700x394.jpg",
          "created_at": "2021-03-10T22:41:44.324Z",
          "posted_at": "2021-03-10T22:28:17.000Z"
        },
        {
          "id": "60494b28b8eba3001764f3b1",
          "link": "https://tecnoblog.net/420003/pubg-mobile-recebe-patch-1-3-com-evento-de-musica-eletronica/",
          "title": "PUBG Mobile recebe patch 1.3 com evento de música eletrônica",
          "thumb": "https://tecnoblog.net/wp-content/uploads/2021/03/EwCwcvfXAAAKCLi-700x394.jpg",
          "created_at": "2021-03-10T22:41:44.345Z",
          "posted_at": "2021-03-10T22:22:20.000Z"
        }
      ],
      "total": 490,
      "count": 20
    },
    TechNews_RefreshParam: [
      {
        "link": "https://www.uol.com.br/tilt/noticias/redacao/2020/10/07/filha-de-haitianos-executiva-do-google-trabalha-por-tecnologias-inclusivass.htm"
      }
    ],
    TechNews_RefreshResponse: [
      "https://www.uol.com.br/tilt/noticias/redacao/2020/10/07/filha-de-haitianos-executiva-do-google-trabalha-por-tecnologias-inclusivass.htm"
    ],
    TechSource_ArrayOfChannels: [{
      "link": "https://www.youtube.com/channel/UCU5JicSrEM5A63jkJ2QvGYw",
      "title": "Filipe Deschamps",
      "description": "O lema do canal descreve bem o que o Filipe quer nos apresentar com seu conteúdo. Como diz a descrição: programação vai muito além da sintaxe.",
      "tags": [
        "entrevistas"
      ],
      "category": "Entrevista, Webinars & Dicas 📣"
    }],
    TechSource_ArrayOfMeetups: [{
      "link": "https://www.meetup.com/pt-BR/globotech/events/276854651/",
      "title": "#23 Globotech: A SmartTV, o Globoplay e a Agilidade",
      "date": "qua, 17 de mar, 18:00 BRT",
      "owner": "globotech",
      "address": "Evento on-line"
    }],
    TechSource_ArrayOfCompanies: [{
      "name": "iFood",
      "address": "São Paulo, SPCampinas, SPSalvador, BA",
      "techs": "Redux, Recompose, Ducks, Saga, Jest, Enzyme, actionz",
      "url": "https://ifood.com.br"
    }],
    TechSource_YtAbout: {
      "profileImage": "https://yt3.ggpht.com/ytc/AAUvwngOAr7RVpz7KFey_j1mHjerywyoX0XV_vo725vcOg=s900-c-k-c0x00ffffff-no-rj",
      "userGithub": ""
    },
    TechSource_ArrayOfMovies: [{
      "link": "https://hackermovie.club/title/tt0244244/",
      "title": "Swordfish",
      "cloudTag": "Thriller,Caper Story",
      "category": "Thrillers / Drama",
      "type": "MOVIE",
      "year": 2001,
      "rating": 6.5,
      "thumb": ""
    }],
    MagnetSource_ArrayOfResults: [{
      "link": "magnet:?xt=urn:btih:684E3D0CFAB237DED715DCC546BFBCF90FDFA09F&dn=%5BSNES%5D+Super+Nintendo+Games+Collection+%5B765+ROMS%5D+%2B+Snes9x+1.53&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce",
      "name": "[SNES] Super Nintendo Games Collection [765 ROMS] + Snes9x 1.53",
      "size": "1.03 GB",
      "seeds": 139,
      "leech": 21,
      "engine_url": "https://pirateproxy.live",
      "desc_link": "https://pirateproxy.live/torrent/8028980/[SNES]_Super_Nintendo_Games_Collection_[765_ROMS]___Snes9x_1.53"
    }],
    MagnetSource_Detail: {
      "name": "Liga da JustiÃ§a de Zack Snyder Torrent (2021) Dual Ã�udio 5.1 / Dublado WEB-DL 720p | 1080p | 2160p 4K FULL HD â€“ Download",
      "thumb": "https://www.themoviedb.org/t/p/w342/yox4nyshPZkAwRchjat37fmVhQ.jpg",
      "links": [
        {
          "url": "magnet:?xt=urn:btih:02c4214302c84a1dae1b0aa8fb90a338ee189a41&dn=COMANDO.TO%20-%20Zack.Snyders.Justice.League.2021.720p.WEB-DL.DDP5.1.DUAL&tr=udp%3a%2f%2fpublic.popcorn-tracker.org%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2fexodus.desync.com%3a6969%2fannounce&tr=udp%3a%2f%2fretracker.lanta-net.ru%3a2710%2fannounce&tr=udp%3a%2f%2fopen.stealth.si%3a80%2fannounce&tr=udp%3a%2f%2fwww.torrent.eu.org%3a451%2fannounce&tr=udp%3a%2f%2fopentracker.i2p.rocks%3a6969%2fannounce&tr=http%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f3rt.tace.ru%3a60889%2fannounce",
          "text": "WEB-DL 720p Dual Ã�udio 5.1 (MKV) | 2.7 GB\n",
          "type": "magnet"
        },],
      "engine_url": "https://comandotorrent.net",
      "desc_link": "https://comandotorrent.net/liga-da-justica-de-zack-snyder-torrent/"
    },
    BrowserScreenshotUrls: [
      "https://i.imgur.com/4BPDf8E.png",
      "https://i.imgur.com/4E4UUUw.png",
      "https://i.imgur.com/0Leb0GW.png"
    ],
    AppInfo: {
      "appname": "SitePlaceholder"
    }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc);
