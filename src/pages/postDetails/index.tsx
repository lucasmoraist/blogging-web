import { PostRender } from "@/components/postRender";
import { useNavigate, useParams } from "react-router-dom"
import posts from "@/data/posts.json";
import style from './post-details.module.scss'
import { ArrowLeft } from "lucide-react";

export function PostDetails() {
    const navigate = useNavigate();

    const { id } = useParams();
    const postId = Number(id);

    const post = posts.find((post) => post.id === postId);

    if (!post) {
        return <h1>Post not found</h1>
    }

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