import ReactBR from '../infra/crosscutting/schemas/ReactBR';

export default interface IReactBRRepository {
  listCompanies(): Promise<ReactBR[]>;
};
