import { PostRender } from '@/components/postRender';
import { useNavigate, useParams } from 'react-router-dom';
import style from './post-details.module.scss';
import { ArrowLeft } from 'lucide-react';
import { NotFound } from '../notFound';
import { IPost } from '@/interface/post.interface';
import { useEffect, useState } from 'react';
import { http } from '@/utils/axios';

export function PostDetails() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost>();

  const { postId } = useParams();

  useEffect(() => {
    http()
      .get(`/posts/${postId}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  if (!posts) return <NotFound />;

  return (
    <main className={style.mainContainer}>
      <button onClick={() => navigate('/')}>
        <ArrowLeft />
        Voltar
      </button>
      <PostRender id={postId} post={posts} />
    </main>
  );
}
