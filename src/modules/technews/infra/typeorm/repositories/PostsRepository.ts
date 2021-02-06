import { Repository, getRepository } from 'typeorm';
import IPostsRepository from '@modules/technews/repositories/IPostRepository';

import ICreatePostDTO from '@modules/technews/dtos/ICreatePostDTO';
import IResultPostDTO from '@modules/technews/dtos/IResultPostDTO';
import ISearchPostDTO from '@modules/technews/dtos/ISearchPostDTO';
import IDeletePostFilterDTO from '@modules/technews/dtos/IDeletePostFilterDTO';

import Post from '../schemas/Post';
import PostContent from '../schemas/PostContent';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post, process.env.DB_MONGO_CONNECTION);
  }

  public async create({
    link,
    title,
    thumb,
    contents,
    created_at
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      link,
      title,
      thumb,
      contents,
      posted_at: created_at
    });

    const contentRepostitory = getRepository(PostContent, process.env.DB_MONGO_CONNECTION);
    const contentsItems = contentRepostitory.create(contents);

    post.contents = contentsItems;

    await this.ormRepository.save(post);

    return post;
  }

  public async findByUrl(urls: string[]): Promise<Post[]> {
    const urlsFormatted = urls.map((url) => new RegExp(url, 'i'));
    const urlFilters = urlsFormatted.map((urlFormatted) => ({
      link: { $regex: urlFormatted },
    }));

    const posts = await this.ormRepository.find({
      where: { $or: [...urlFilters] },
    });
    // const posts = await this.ormRepository.find();

    return posts;
  }

  public async findByOrigin({ url, page = 1, allowContents }: ISearchPostDTO): Promise<IResultPostDTO> {
    const itemsPerPage = 20;
    const skip = (page - 1) * itemsPerPage; // 0
    const take = itemsPerPage; // 10

    const urlFormatted = new RegExp(url, 'i');
    const originFilter = {
      link: { $regex: urlFormatted },
    };

    const [data, total] = await this.ormRepository.findAndCount({
      select: !allowContents ? ['id', 'link', 'title', 'thumb', 'created_at', 'posted_at'] : undefined,
      where: { ...originFilter },
      order: { posted_at: 'DESC' },
      skip,
      take,
    });

    const formattedData = data.map((item, key) => ({
      ...item,
      //title: `${skip + (key + 1)}: ${item.title}`
    }));

    return { data: formattedData, total };
  }

  public async findDetails(url: string): Promise<Post | undefined> {
    const urlFilters = {
      link: { $in: [url] },
    };

    const post = await this.ormRepository.findOne({ where: { ...urlFilters } });

    return post;
  }

  public async delete(filterPost: IDeletePostFilterDTO): Promise<Number> {
    const filters = {
      ...filterPost
    };

    //await this.ormRepository.delete({ ...filters });

    const postsFound = await this.ormRepository.find({ where: { ...filters } });
    const affectedRows = postsFound.length;
    for (let i = 0; i <= affectedRows; i++) {
      await this.ormRepository.delete({ ...filters });
    }

    return affectedRows;
  }
}

export default PostsRepository;
