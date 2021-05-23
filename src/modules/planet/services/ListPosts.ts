import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISearchPostDTO from '@modules/planet/dtos/ISearchPostDTO';
import IResultPostDTO from '@modules/planet/dtos/IResultPostDTO';
import IPostsRepository from '@modules/planet/repositories/IPostRepository';
import IHistoryRepository from '../repositories/IHistoryRepository';

@injectable()
class ListPostsService {
  constructor(
    @inject('GalleryRepository')
    private postsRepository: IPostsRepository,

    @inject('GalleryHistoryRepository')
    private historyRepository: IHistoryRepository,
  ) { }

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

    const history = await this.historyRepository.findAll();

    const postsTreated = posts.data.map((item) => ({
      ...item,
      images: item.images.length
        ? item.images
        : ['http://ps.fscache.com/images/left-logo.jpg'],
      cover: history.filter(({ labels }) => item.labels[0] == labels[0])[0].cover
    }));

    return { ...posts, data: postsTreated };
  }
}

export default ListPostsService;
