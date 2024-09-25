import { IPostAdmin } from "@/interface/post-admin.interface";
import { http } from "@/utils/axios";

interface DataPagination {
  currentPage: number;
  itemsPerPage: number;
  posts: IPostAdmin[];
  totalNumberOfPages: number;
}

interface Props {
  currentPage: number;
  itemsPerPage: number;
  setPosts: (posts: IPostAdmin[]) => void;
  setTotalPages: (totalPages: number) => void;
  setLoading: (loading: boolean) => void;
}

export const listAdmin = async ({
  currentPage,
  itemsPerPage,
  setPosts,
  setTotalPages,
  setLoading,
}: Props) => {
  http()
    .get<DataPagination>(
      `/admin/posts?page=${currentPage + 1}&limit=${itemsPerPage}`
    )
    .then((response) => {
      setPosts(response.data.posts);
      setTotalPages(response.data.totalNumberOfPages);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Erro ao buscar posts:", error);
    });
};
