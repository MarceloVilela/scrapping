import Post from '../infra/typeorm/schemas/Bulletin';

export default interface IDeletePostFilterDTO {
  ids: string[];
}
