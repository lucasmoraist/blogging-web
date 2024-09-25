import { IDataPagination } from "@/interface/pagination.interface";
import { http } from "@/utils/axios";

interface Props {
  signal: AbortSignal;
  currentPage: number;
  itemsPerPage: number;
}

export const listPosts = async ({
  signal,
  currentPage,
  itemsPerPage,
}: Props) => {
  try {
    const response = await http().get<IDataPagination>(
      `/posts?page=${currentPage}&limit=${itemsPerPage}`,
      { signal }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.log("Request canceled");
      } else {
        throw new Error("Error when searching for posts: " + error.message);
      }
    } else {
      throw new Error("Unexpected error");
    }
  }
};
