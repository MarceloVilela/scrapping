import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHistoryRepository from '@modules/planet/repositories/IHistoryRepository';
import History from '@modules/planet/infra/typeorm/schemas/History';
import IUpdateHistoryDTO from '@modules/planet/dtos/IUpdateHistoryDTO';

@injectable()
class UpdateHistoryService {
  constructor(
    @inject('GalleryHistoryRepository')
    private historyRepository: IHistoryRepository,
  ) {}

  public async execute({ labels, page }: IUpdateHistoryDTO): Promise<void> {
    await this.historyRepository.update({
      labels,
      page,
    });

    /* if (!history) {
      throw new AppError('History not found');
    }

    return history; */
  }
}

export default UpdateHistoryService;
