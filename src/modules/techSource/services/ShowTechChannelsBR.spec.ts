import "reflect-metadata";

import ShowHomePageService from './ShowTechChannelsBR';
import FakeChannels from '@modules/techSource/repositories/fakes/TechChannelsBR';
import ITechChannelsBRRepository from '@modules/techSource/repositories/ITechChannelsBRRepository';

let fakeChannelsRepository: ITechChannelsBRRepository;
let showChannels: ShowHomePageService;

describe('@tech-source/channels-br', () => {
  beforeAll(() => {
    fakeChannelsRepository = new FakeChannels();

    showChannels = new ShowHomePageService(
      fakeChannelsRepository
    );
  });

  it('should be able to list channels on readme', async () => {

    const channelData = await showChannels.execute({ url: '' });
    console.log(channelData);
    expect(channelData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          link: expect.stringContaining('://'),
          title: expect.stringMatching(/\w/),
          description: expect.stringMatching(/\w/),
          tags: expect.arrayContaining([
            expect.stringMatching(/\w/),
          ]),
          category: expect.stringMatching(/\w/),
        }),
      ])
    );

  });
});
