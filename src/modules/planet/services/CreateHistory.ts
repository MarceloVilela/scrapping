import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHistoryRepository from '@modules/planet/repositories/IHistoryRepository';
import History from '@modules/planet/infra/typeorm/schemas/History';
import ICreateHistoryDTO from '@modules/planet/dtos/ICreateHistoryDTO';

@injectable()
class CreateHistoryService {
  constructor(
    @inject('GalleryHistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  public async execute({
    sourceLink,
    labels,
    page,
  }: ICreateHistoryDTO): Promise<History | undefined> {
    const historyExists = await this.historyRepository.findOne({
      searchFilters: labels,
    });

    if (historyExists) {
      return historyExists;
    }

    const history = await this.historyRepository.create({
      sourceLink,
      labels,
      page,
    });

    return history;
  }
}

export default CreateHistoryService;
