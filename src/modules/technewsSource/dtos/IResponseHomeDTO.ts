interface Post {
  link: string | null | undefined;
  title: string | null | undefined;
  thumb: string | null | undefined;
  created_at: string | null | undefined;
}

export default interface IResponseHomeDTO {
  posts: Post[];
};
