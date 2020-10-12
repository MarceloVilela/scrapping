import { injectable, inject, injectAll } from 'tsyringe';

import IYtAboutDTO from '@modules/techSource/dtos/IYtAboutDTO';
import IYtAboutRepository from '@modules/techSource/repositories/IYtAboutRepository';
import YtAboutData from '@modules/techSource/infra/crosscutting/schemas/YtAboutData'

@injectable()
class ShowMeetUp {
  constructor(
    @inject('YtAboutSource')
    private source: IYtAboutRepository,
  ) { }

  public async execute({ url }: IYtAboutDTO): Promise<YtAboutData> {
    const data = await this.source.getAbout({ url });

    return data;
  }
}

export default ShowMeetUp;
