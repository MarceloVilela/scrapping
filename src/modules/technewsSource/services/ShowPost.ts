import { injectable, injectAll } from 'tsyringe';
//
import { prefixProtocol, formatDate } from '@shared/utils';
//
import IArticlesRepository from '../repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import Article from '../infra/crosscutting/schemas/Article';
//
import ArticleContent, { ArticleContentType } from '../infra/crosscutting/schemas/ArticleContent';
//import articleAsset from '../repositories/fakes/assets/json/article/tecnoblog.json';

@injectable()
class ShowPostService {
  constructor(
    // https://github.com/microsoft/tsyringe#injectall
    @injectAll('TechNewsSource')
    private sources: IArticlesRepository[],
  ) { }

  public async execute({ url }: IShowPostDTO): Promise<Article> {
    const [sourceCurrent] = this.sources.filter((item) => url.includes(item.getOriginUrl()),);

    const { link, title, thumb, contents, created_at } = await sourceCurrent.getPost({
      url,
    });
    //const { link, title, thumb, contents, created_at } = articleAsset as Article;

    const contentTypes = ['text', 'text-highlighted', 'image', 'video'];

    const filterType = (str: string) => contentTypes.includes(str);
    const filterValueEmpty = (str: string) => str && str.replace(/\s/g, '').length;
    const contentsFormatted = contents
      .filter(({ type, value }: ArticleContent) => filterValueEmpty(value) && filterType(type));

    return {
      link: prefixProtocol(link),
      title,
      thumb: prefixProtocol(thumb),
      contents: contentsFormatted,
      created_at: typeof created_at === 'string' ? formatDate(created_at) : created_at
      //created_at: new Date(formatDate(typeof created_at !== "string" ? created_at.toString() : ''))
    };
  }
}

export default ShowPostService;
