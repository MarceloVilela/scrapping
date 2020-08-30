import Post from '../infra/typeorm/schemas/Bulletin';

export default interface IResultPostDTO {
  data: Post[];
  total: number;
}
