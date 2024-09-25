import { PostRender } from "@/components/postRender";
import { useNavigate, useParams } from "react-router-dom";
import style from "./post-details.module.scss";
import { ArrowLeft } from "lucide-react";
import { Exceptions } from "../exception";
import { IPost } from "@/interface/post.interface";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import { getPost } from "./service/getPost";

export function PostDetails() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost>();
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();

  useEffect(() => {
    getPost({ postId, setPosts, setLoading });
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
