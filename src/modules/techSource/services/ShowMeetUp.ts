import { injectable, inject, injectAll } from 'tsyringe';

import IShowPostDTO from '@modules/techSource/dtos/IShowPostDTO';
import IMeetUpRepository from '@modules/techSource/repositories/IMeetUpRepository';
import MeetUpData from '@modules/techSource/infra/crosscutting/schemas/MeetUpData'

@injectable()
class ShowMeetUp {
  constructor(
    @inject('MeetUpSource')
    private source: IMeetUpRepository,
  ) { }

  public async execute({ url }: IShowPostDTO): Promise<MeetUpData[]> {
    const data = await this.source.listMeetUp();

    return data;
  }
}

export default ShowMeetUp;
