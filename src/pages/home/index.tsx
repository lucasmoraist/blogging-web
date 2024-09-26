import style from "./styles/home.module.scss";
import { Aside } from "./aside";
import { useEffect, useState } from "react";
import { IPost } from "@/interface/post.interface";
import { Feed } from "./feed";
import Loader from "../../components/loader/loader";
import { PagesList } from "@/components/pagesList";
import { Exceptions } from "../exception";
import apiService from "@/utils/apiService";

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    apiService.listPosts(currentPage, itemsPerPage).then(data => {
      if (data) {
        console.log(data);
        
        setPosts(data.posts);
        setTotalNumberOfPages(data?.totalNumberOfPages);
        setError("");
      }
    });

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
        <Exceptions statusCode={500}/>
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
