import { IPost } from "./post.interface";

export interface IDataPagination {
  currentPage: number;
  itemsPerPage: number;
  posts: IPost[];
  totalNumberOfPages: number;
}
