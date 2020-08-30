interface IContent {
  [key: string]: string;
}

interface IPost {
  sourceLink: string;
  title: string;
  images: string[];
  links: string[];
  contents: IContent[];
  labels?: string[];
  posted_at: string;
}

export default interface IPublications {
  title: string;
  posts: IPost[];
  pageCurrent?: number;
  pageLast?: number;
}
