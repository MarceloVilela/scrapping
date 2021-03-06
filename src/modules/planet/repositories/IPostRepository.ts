import ICreatePostDTO from '../dtos/ICreatePostDTO';
import ISearchPostDTO from '../dtos/ISearchPostDTO';
import IResultPostDTO from '../dtos/IResultPostDTO';
import Bulletin from '../infra/typeorm/schemas/Bulletin';
import IDeletePostFilterDTO from '../dtos/IDeletePostFilterDTO';

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Bulletin>;
  find(data: ISearchPostDTO): Promise<IResultPostDTO>;
  findOne(id: string): Promise<Bulletin | undefined>;
  delete(filterPost: IDeletePostFilterDTO): Promise<Number>;
};
