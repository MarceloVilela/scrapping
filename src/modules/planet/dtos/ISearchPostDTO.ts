interface Content {
  key: string;
  value: string;
}

export default interface ISearchPostDTO {
  searchQuery: string;
  searchFilters: string[];
  page: number;
};
