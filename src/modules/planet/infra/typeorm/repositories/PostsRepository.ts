import { Repository, getRepository, getMongoRepository } from 'typeorm';
import IPostsRepository from '@modules/planet/repositories/IPostRepository';
import ICreatePostDTO from '@modules/planet/dtos/ICreatePostDTO';
import ISearchPostDTO from '@modules/planet/dtos/ISearchPostDTO';
import IResultPostDTO from '@modules/planet/dtos/IResultPostDTO';
import Bulletin from '../schemas/Bulletin';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Bulletin>;

  constructor() {
    this.ormRepository = getRepository(Bulletin, process.env.DB_MONGO_CONNECTION);
  }

  public async create({
    sourceLink,
    title,
    images,
    links,
    contents,
    labels,
    posted_at,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      sourceLink,
      title,
      images,
      links,
      contents,
      labels,
      posted_at,
    });

    await this.ormRepository.save(post);

    return post;
  }

  public async find({
    searchQuery,
    searchFilters,
    page,
  }: ISearchPostDTO): Promise<IResultPostDTO> {

    let title = {};
    if (!searchQuery.includes('http')) {
      try {
        const titleValueFormatted = new RegExp(searchQuery, 'i');
        title = { title: { $regex: titleValueFormatted } }
      } catch (error) {
        title = { title: searchQuery };
      }
    } else {
      title = { links: { $in: [searchQuery] } };
    }
    console.log(title, searchQuery);

    try {
      const itemsPerPage = 100;
      const skip = (page - 1) * itemsPerPage; // 0
      const take = page * itemsPerPage; // 10

      // const whereTitle = searchQuery ? { $regex: titleValueFormatted } : //;
      const labels = searchFilters.map((filter) => ({
        labels: { $in: [filter] },
      }));

      /* console.log('-----------------');
      console.log(Date.now().toLocaleString());
      console.log(searchQuery, searchFilters);
      console.log(titleValueFormatted, labels);
      console.log(page); */

      /* await getMongoRepository(Post).deleteMany({
        $and: [
          { created_at: { $lte: new Date(2020, 7, 23, 10, 53, 12) } },
          { labels: { $in: ['Star'] } },
          { labels: { $in: ['HD'] } },
        ],
      }); */

      const [data, total] = await this.ormRepository.findAndCount({
        where:
          searchFilters.length > 0
            ? {
              $and: [title, ...labels],
            }
            : title,
        order: { posted_at: 'DESC' },
        skip,
        take,
      });

      // return [];
      return { data, total };
    } catch (error) {
      return { data: [], total: 0 };
    }
  }

  public async findOne(id): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(id);

    return post;
  }
}

export default PostsRepository;
