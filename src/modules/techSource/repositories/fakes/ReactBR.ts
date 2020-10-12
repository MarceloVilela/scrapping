import { JSDOM } from 'jsdom';

import IReactBRRepository from '@modules/techSource/repositories/IReactBRRepository';
import ReactBRData from '@modules/techSource/infra/crosscutting/schemas/ReactBR';

class ReactBR implements IReactBRRepository {

  getOriginUrl(): string {
    return 'https://github.com/react-brasil/empresas-que-usam-react-no-brasil/blob/master/README.md';
  }

  async listCompanies(): Promise<ReactBRData[]> {
    const response = await JSDOM.fromFile(`./src/assets/fakes/html/tech-source/react-br/react-br.html`);
    //const response = await JSDOM.fromFile('./src/modules/techSource/infra/crosscutting/repositories/html.html');
    const { document } = response.window;

    const getContent = (trCompany: Element) => {
      return {
        name: trCompany.querySelector("td:nth-of-type(1)")?.textContent,
        address: trCompany.querySelector("td:nth-of-type(2)")?.textContent,
        techs: trCompany.querySelector("td:nth-of-type(3)")?.textContent,
        url: trCompany.querySelector("td:nth-of-type(1) a")?.getAttribute("href")
      }
    }

    //return [document.documentElement.outerHTML];
    const tbody = document.querySelector("table:nth-of-type(1) tbody")
    if(!tbody){
      return [];
    }
    const companies = [...tbody.querySelectorAll("tr")]
      .map(el => getContent(el))
      .map(({ name, address, techs, url }) => ({
        name: String(name),
        address: String(address),
        techs: String(techs),
        url: String(url),
      }))

    return companies;
  }
}

export default ReactBR;
