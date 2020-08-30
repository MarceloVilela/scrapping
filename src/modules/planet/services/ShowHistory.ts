import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHistoryRepository from '@modules/planet/repositories/IHistoryRepository';
import History from '@modules/planet/infra/typeorm/schemas/History';
import ISearchHistoryDTO from '@modules/planet/dtos/ISearchHistoryDTO';

@injectable()
class ListHistoryService {
  constructor(
    @inject('GalleryHistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  public async execute({
    searchFilters,
  }: ISearchHistoryDTO): Promise<History | undefined> {
    const history = await this.historyRepository.findOne({ searchFilters });

    return history;
  }
}

export default ListHistoryService;
