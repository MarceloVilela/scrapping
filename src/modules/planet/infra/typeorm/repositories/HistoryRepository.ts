import { Repository, getRepository, getMongoRepository } from 'typeorm';

import IPostsRepository from '@modules/planet/repositories/IHistoryRepository';

import ICreateHistoryDTO from '@modules/planet/dtos/ICreateHistoryDTO';
import ISearchHistoryDTO from '@modules/planet/dtos/ISearchHistoryDTO';
import IUpdateHistoryDTO from '@modules/planet/dtos/IUpdateHistoryDTO';

import History from '../schemas/History';

class HistoryRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(History, process.env.DB_MONGO_CONNECTION);
  }

  public async create({
    sourceLink,
    labels,
    page,
  }: ICreateHistoryDTO): Promise<History> {
    const history = this.ormRepository.create({
      sourceLink,
      labels,
      page,
    });

    await this.ormRepository.save(history);

    return history;
  }

  public async findOne({
    searchFilters,
  }: ISearchHistoryDTO): Promise<History | undefined> {
    const labels = searchFilters.map((filter) => ({
      labels: { $in: [filter] },
    }));

    console.log('history-findOne-labels', labels);

    const history = await this.ormRepository.findOne({
      where: {
        $and: [...labels],
      },
    });

    return history;
  }

  public async update({
    labels: searchFilters,
    page,
  }: IUpdateHistoryDTO): Promise<void> {
    const labels = searchFilters.map(filter => ({
      labels: { $in: [filter] },
    }));

    const history = await this.ormRepository.update(
      {
        where: {
          $and: [...labels],
        },
      },
      { page },
    );

    console.log('update-history-service', page);
    // history.page = page;
    // history.save();
  }
}

export default HistoryRepository;
