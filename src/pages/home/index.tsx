import style from "./styles/home.module.scss";
import { Aside } from "./aside";
import { useEffect, useState } from "react";
import { IPost } from "@/interface/post.interface";
import { http } from "@/utils/axios";
import { IDataPagination } from "@/interface/pagination.interface";
import { Feed } from "./feed";
import Loader from "../../components/loader/loader";
import { PagesList } from "@/components/pagesList";

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const fetchPosts = async (signal: AbortSignal) => {
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

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller.signal)
      .then((data) => {
        if (data) {
          setPosts(data.posts);
          setTotalNumberOfPages(data?.totalNumberOfPages);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [currentPage, itemsPerPage]);

  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={style.homeContainer}>
          <div className={style.randomPosts}>
            <Aside posts={posts} />
          </div>
          <div className={style.feed}>
            <Feed posts={posts} />
            <PagesList 
              currentPage={currentPage} 
              handlePagination={handlePagination} 
              totalNumberOfPages={totalNumberOfPages}
            />
          </div>
        </div>
      )}
    </>
  );
}
