enum ContentType {
  TEXT = 'text',
  TEXT_HIGHLIGHTED = 'text-highlighted',
  IMAGE = 'image',
  VIDEO = 'video',
}

interface Content {
  type: ContentType;
  value: string;
}

export default interface ICreatePostDTO {
  link: string;
  title: string;
  thumb: string;
  contents: Content[];
};
