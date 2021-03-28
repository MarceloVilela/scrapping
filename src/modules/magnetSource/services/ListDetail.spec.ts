import { JSDOM } from 'jsdom';
import path from 'path';

import './validations'

import ListDetailService from './ListDetail';
//import AvailableNewsSources from '@modules/magnetSource/infra/crosscutting/repositories';

//import MagnetFakeSources from '@modules/magnetSource/repositories/fakes';
import MagnetSources from '@modules/magnetSource/infra/crosscutting/repositories';

const filePath = path.resolve('src', 'assets', 'fakes', 'html', 'magnet-source', 'detail', '%s-detail.html');

let listDetail: ListDetailService;

describe('@magnetSource/ListDetail', () => {
  beforeAll(() => {
    const sources = Object.values(MagnetSources).map((Source) => (
      new Source()
    ));

    listDetail = new ListDetailService(
      sources
    );

    jest.setTimeout(10000);
  });

  //link, name, size, seeds, leech, engine_url, desc_link
  it('should be able to list results by ct engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'ct')));

    const results = await listDetail.execute({
      url: 'https://comando/aaa'
    });

    expect.toContainMagnetDetail(results);
  });

  it('should be able to list results by mt engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'mt')));

    const results = await listDetail.execute({
      url: 'https://megatorrentshd/aaa'
    });

    expect(results).toContainMagnetDetail();
  });

  it('should be able to list results by ob engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'ob')));

    const results = await listDetail.execute({
      url: 'https://ondebaixa/aaa'
    });

    expect.toContainMagnetDetail(results);
  });

  it('should be able to list results by tf engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'tf')));

    const results = await listDetail.execute({
      url: 'https://tf/aaa'
    });

    expect.toContainMagnetDetail(results);
  });

  it('should be able to list results by tt engine', async () => {
    jest
      .spyOn(JSDOM, 'fromURL')
      .mockImplementationOnce(() => JSDOM.fromFile(filePath.replace('%s', 'tt')));

    const results = await listDetail.execute({
      url: 'https://tool.org/aaa'
    });

    expect.toContainMagnetDetail(results);
  });

});
