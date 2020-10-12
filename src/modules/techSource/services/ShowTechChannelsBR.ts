import { injectable, inject, injectAll } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShowPostDTO from '@modules/techSource/dtos/IShowPostDTO';
import ITechChannelsBRRepository from '@modules/techSource/repositories/ITechChannelsBRRepository';
import ChannelData from '@modules/techSource/infra/crosscutting/schemas/ChannelData'

@injectable()
class ShowTechChannelsBR {
  constructor(
    @inject('TechSource')
    private source: ITechChannelsBRRepository,
  ) {}

  public async execute({ url }: IShowPostDTO): Promise<ChannelData[]> {
    const post = await this.source.getPost({
      url,
    });

    return post;
  }
}

export default ShowTechChannelsBR;
