import { PostRender } from "@/components/postRender";
import { useNavigate, useParams } from "react-router-dom"
import posts from "@/data/posts.json";
import style from './post-details.module.scss'
import { ArrowLeft } from "lucide-react";
import { NotFound } from "../notFound";

export function PostDetails() {
    const navigate = useNavigate();

    const { id } = useParams();
    const postId = Number(id);

    const post = posts.find((post) => post.id === postId);

    if (!post) return  <NotFound />

    return (
        <main className={style.mainContainer}>
            <button onClick={() => navigate('/')}>
                <ArrowLeft />
                Voltar
            </button>
            <PostRender id={postId} post={post} />
        </main>
    )
}