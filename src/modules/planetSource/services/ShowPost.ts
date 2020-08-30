import { injectable, inject, injectAll } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShowPostDTO from '@modules/planetSource/dtos/IShowPostDTO';
import IPostsRepository from '../repositories/IPostRepository';

@injectable()
class ShowPostService {
  constructor(
    // https://github.com/microsoft/tsyringe#injectall
    @injectAll('PlanetSource')
    private sources: IPostsRepository[],
  ) {}

  public async execute({ url }: IShowPostDTO): Promise<any> {
    const [sourceCurrent] = this.sources.filter(item =>
      url.includes(item.getOriginUrl()),
    );

    const post = await sourceCurrent.getPost({
      url,
    });

    return post;
  }
}

export default ShowPostService;
