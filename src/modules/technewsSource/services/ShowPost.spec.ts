import "reflect-metadata";
import { JSDOM } from 'jsdom';
import path from 'path';

import './validations'
import AppError from '@shared/errors/AppError';

import ShowPostService from './ShowPost';
import FakeRepositories from '@modules/technewsSource/repositories/fakes';
import IArticlesRepository from '@modules/technewsSource/repositories/IArticlesRepository';

const filePath = path.resolve('src', 'assets', 'fakes', 'html', 'technews-source', 'home', '%s');

//let fakeEngineRepository: IArticlesRepository[];
let showPost: ShowPostService;

const mockFromURL = (filename: string) => JSDOM.fromFile(filePath.replace('%s', filename));

describe('@technews-source/post', () => {
  beforeAll(() => {
    const sources = Object.values(FakeRepositories).map((Source) => (
      new Source()
    ));

    showPost = new ShowPostService(
      sources
    );
  });

  it('should be able to list post contents on the TecnoBlog post', async () => {
    const article = await showPost.execute({ url: 'https://tecnoblog.net' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the GizModo post', async () => {
    const article = await showPost.execute({ url: 'https://gizmodo.uol.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the Tecmundo post', async () => {
    const article = await showPost.execute({ url: 'https://www.tecmundo.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the MundoBit post', async () => {
    const article = await showPost.execute({ url: 'https://blogs.ne10.uol.com.br/mundobit/' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the CanalTech post', async () => {
    const article = await showPost.execute({ url: 'https://canaltech.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the UolTecnologia post', async () => {
    const article = await showPost.execute({ url: 'https://www.uol.com.br/tilt' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the OlharDigital post', async () => {
    const article = await showPost.execute({ url: 'https://olhardigital.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the Leak post', async () => {
    const article = await showPost.execute({ url: 'https://www.leak.pt' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the MaisTecnologia post', async () => {
    const article = await showPost.execute({ url: 'https://www.maistecnologia.com' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the Adrenaline post', async () => {
    const article = await showPost.execute({ url: 'https://adrenaline.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the CocaTech post', async () => {
    const article = await showPost.execute({ url: 'https://cocatech.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the ExameTecnologia post', async () => {
    const article = await showPost.execute({ url: 'https://exame.com/tecnologia' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the ShowMeTech post', async () => {
    const article = await showPost.execute({ url: 'https://www.showmetech.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the TudoEmTecnologia post', async () => {
    const article = await showPost.execute({ url: 'https://tudoemtecnologia.com' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the ComputerWorldPt post', async () => {
    const article = await showPost.execute({ url: 'https://www.computerworld.com.pt' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the SapoTek post', async () => {
    const article = await showPost.execute({ url: 'https://tek.sapo.pt' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the FourGNews post', async () => {
    const article = await showPost.execute({ url: 'https://4gnews.pt' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the TechTudo post', async () => {
    const article = await showPost.execute({ url: 'https://www.techtudo.com.br' });
    expect(article).toContainPostObject();
  });

  it('should be able to list post contents on the ProfissionaisTI post', async () => {
    const article = await showPost.execute({ url: 'https://www.profissionaisti.com.br' });
    expect(article).toContainPostObject();
  });
});
