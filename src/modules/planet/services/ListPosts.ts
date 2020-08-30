import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISearchPostDTO from '@modules/planet/dtos/ISearchPostDTO';
import IResultPostDTO from '@modules/planet/dtos/IResultPostDTO';
import IPostsRepository from '@modules/planet/repositories/IPostRepository';

@injectable()
class ListPostsService {
  constructor(
    @inject('GalleryRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({
    searchQuery,
    searchFilters,
    page,
  }: ISearchPostDTO): Promise<IResultPostDTO> {
    const posts = await this.postsRepository.find({
      searchQuery,
      searchFilters,
      page,
    });

    const postsTreated = posts.data.map((item) => ({
      ...item,
      images: item.images.length
        ? item.images
        : ['http://ps.fscache.com/images/left-logo.jpg'],
    }));

    return { ...posts, data: postsTreated };
  }
}

export default ListPostsService;
