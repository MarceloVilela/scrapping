import { injectable, injectAll } from 'tsyringe';
//
import { formatDate } from '@shared/utils';
//
import IArticlesRepository from '../repositories/IArticlesRepository';
import IShowPostDTO from '@modules/technewsSource/dtos/IShowPostDTO';

interface Post {
  link: string;
  title: string;
  thumb: string;
  created_at: Date;
}

interface IResponseHomeDTO {
  posts: Post[];
}

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
        const created_at = formatDate(String(preview.created_at));

        return {
          link: String(preview.link),
          title: String(preview.title),
          thumb: String(preview.thumb),
          created_at,
        }
      })
    const data = { posts };

    return data;
  }
}

export default ShowPostService;
