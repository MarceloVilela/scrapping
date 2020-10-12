import { JSDOM } from 'jsdom';

import IMeetUpRepository from '@modules/techSource/repositories/IMeetUpRepository';
import MeetUpData from '@modules/techSource/infra/crosscutting/schemas/MeetUpData';

class MeetUp implements IMeetUpRepository {

  async listMeetUp(): Promise<MeetUpData[]> {
    //+`?mcId=${cityId}`
    const { document } = (await JSDOM.fromURL(
      'https://www.meetup.com/pt-BR/?mcId=c1002406',
      {
        referrer: "https://www.meetup.com/pt-BR/?mcId=c1002406",
        //includeNodeLocations: true,
        //storageQuota: 10000000
      }
    )).window

    const getContent = (el: Element) => (

      {
        link: 'https://www.meetup.com' + String(el.querySelector('.eventCard--link')?.getAttribute('href')),
        title: String(el.querySelector('.visibility--a11yHide')?.textContent),
        date: String(el.querySelector('.eventTimeDisplay-startDate')?.textContent),
        owner: String(el.querySelector('.eventCardHead--groupName')?.textContent),
        address: String(el.querySelector('address .wrap--singleLine--truncate')?.textContent)
      }

    )

    const listMeet = [...document.querySelectorAll('section:nth-of-type(1) .card')]
      .map(el => getContent(el))

    return listMeet
  }
}

export default MeetUp;
