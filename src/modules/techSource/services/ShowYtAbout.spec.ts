import "reflect-metadata";

import ShowYtAbout from './ShowYtAbout';
import FakeYt from '@modules/techSource/repositories/fakes/YtAbout';
import IYtAboutRepository from '@modules/techSource/repositories/IYtAboutRepository';

let fakeYtRepository: IYtAboutRepository;
let showAbout: ShowYtAbout;

describe('@tech-source/yt-about', () => {
  beforeAll(() => {
    fakeYtRepository = new FakeYt();

    showAbout = new ShowYtAbout(
      fakeYtRepository
    );
  });

  it('should be able to list details on yt', async () => {

    const about = await showAbout.execute({ url: '' });
    
    expect(about).toEqual(
      expect.objectContaining({
        profileImage: expect.stringContaining('://'),
      }),
    );

  });
});
