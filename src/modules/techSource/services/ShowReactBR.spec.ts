import "reflect-metadata";

import ShowReactBR from './ShowReactBR';
import FakeReactBR from '@modules/techSource/repositories/fakes/ReactBR';
import IReactBRRepository from '@modules/techSource/repositories/IReactBRRepository';

let fakeReactBRRepository: IReactBRRepository;
let showCases: ShowReactBR;

describe('@tech-source/reactbr', () => {
  beforeAll(() => {
    fakeReactBRRepository = new FakeReactBR();

    showCases = new ShowReactBR(
      fakeReactBRRepository
    );
  });

  it('should be able to list cases of react in br', async () => {

    const casesData = await showCases.execute();
    console.log(casesData);
    expect(casesData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.stringMatching(/\w/),
          address: expect.stringMatching(/\w/),
          techs: expect.stringMatching(/\w/),
          url: expect.stringContaining('://'),
        }),
      ])
    );

  });
});
