import { PostRender } from "@/components/postRender";
import { useNavigate, useParams } from "react-router-dom";
import style from "./post-details.module.scss";
import { ArrowLeft } from "lucide-react";
import { Exceptions } from "../exception";
import { IPost } from "@/interface/post.interface";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import apiService from "@/utils/apiService";

export function PostDetails() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost>();
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();

  useEffect(() => {
    apiService.getPost(postId).then((response) => {
      if (response) {
        setPosts(response.data);
        setLoading(false);
      }
    });
  }, [postId]);

  if (loading) return <Loader />;
  if (!posts) return <Exceptions statusCode={404} />;

  return (
    <main className={style.mainContainer}>
      <button onClick={() => navigate("/")}>
        <ArrowLeft />
        Voltar
      </button>
      <PostRender id={postId} post={posts} />
    </main>
  );
}
