interface Content {
  key: string;
  value: string;
}

export default interface ICreatePostDTO {
  sourceLink: string;
  title: string;
  images: string[];
  links: string[];
  contents: Content[];
  labels: string[];
  posted_at: Date | string;
}
