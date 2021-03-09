import ICreateHistoryDTO from '../dtos/ICreateHistoryDTO';
import ISearchHistoryDTO from '../dtos/ISearchHistoryDTO';
import IUpdateHistoryDTO from '../dtos/IUpdateHistoryDTO';

import History from '../infra/typeorm/schemas/History';

export default interface IHistoryRepository {
  create(data: ICreateHistoryDTO): Promise<Post>;
  findOne({ searchFilters: ISearchHistoryDTO }): Promise<History | undefined>;
  update(data: IUpdateHistoryDTO): Promise<void>;
}
