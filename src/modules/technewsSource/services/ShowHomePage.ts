import { injectable, injectAll } from 'tsyringe';
//
import { formatDate } from '@shared/utils';
//
import IArticlesRepository from '../repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';
import IResponseHomeDTO from '../dtos/IResponseHomeDTO';

//import previewsAsset from '../repositories/fakes/assets/json/home/tecnoblog.json';

@injectable()
class ShowPostService {
  constructor(
    // https://github.com/microsoft/tsyringe#injectall
    @injectAll('TechNewsSource')
    private sources: IArticlesRepository[],
  ) { }

  public async execute({ url }: IShowPostDTO): Promise<IResponseHomeDTO> {
    const [sourceCurrent] = this.sources.filter(item =>
      url.includes(item.getOriginUrl()),
    );

    const previews = await sourceCurrent.getHome({
      url,
    });
    //const previews = previewsAsset as IResponseHomeDTO;

    const posts = previews.posts
      .map(preview => {
        const created_at = formatDate(preview.created_at);

        return {
          ...preview,
          created_at,
        }
      })
    const data = { posts };

    return data;
  }
}

export default ShowPostService;
