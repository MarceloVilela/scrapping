import "reflect-metadata";

import ShowMeetUp from './ShowMeetUp';
import FakeMeetUp from '@modules/techSource/repositories/fakes/MeetUp';
import IMeetUpRepository from '@modules/techSource/repositories/IMeetUpRepository';

let fakeMeetUpRepository: IMeetUpRepository;
let showMeetUp: ShowMeetUp;

describe('@tech-source/meetup-category', () => {
  beforeAll(() => {
    fakeMeetUpRepository = new FakeMeetUp();

    showMeetUp = new ShowMeetUp(
      fakeMeetUpRepository
    );
  });

  it('should be able to list meetups on category', async () => {

    const meetUpData = await showMeetUp.execute({ url: '' });
    
    expect(meetUpData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          link: expect.stringContaining('://'),
          title: expect.stringMatching(/\w/),
          date: expect.stringMatching(/\w/),
          owner: expect.stringMatching(/\w/),
          address: expect.stringMatching(/\w/)
        }),
      ])
    );

  });
});
