import Content from './Content';

export default interface Article {
  link: string;
  title: string;
  thumb: string;
  contents: Content[];
  created_at: Date;
}
