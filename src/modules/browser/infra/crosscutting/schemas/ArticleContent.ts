export enum ArticleContentType {
  TEXT = 'text',
  TEXT_HIGHLIGHTED = 'text-highlighted',
  IMAGE = 'image',
  VIDEO = 'video',
}

export default interface ArticleContent {
  type: ArticleContentType;
  value: string;
};
