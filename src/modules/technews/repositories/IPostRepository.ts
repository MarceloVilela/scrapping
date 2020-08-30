import ICreatePostDTO from '../dtos/ICreatePostDTO';
import ISearchPostDTO from '../dtos/ISearchPostDTO';
import IResultPostDTO from '../dtos/IResultPostDTO';
import Post from '../infra/typeorm/schemas/Post';

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  findByUrl(urls: string[]): Promise<Post[]>;
  findByOrigin({url, page}: ISearchPostDTO): Promise<IResultPostDTO>;
  findDetails(url: string): Promise<Post | undefined>;
};
