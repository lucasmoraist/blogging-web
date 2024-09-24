import { PostRender } from '@/components/postRender';
import { useNavigate, useParams } from 'react-router-dom';
import style from './post-details.module.scss';
import { ArrowLeft } from 'lucide-react';
import { NotFound } from '../notFound';
import { IPost } from '@/interface/post.interface';
import { useEffect, useState } from 'react';
import { http } from '@/utils/axios';
import Loader from '@/components/loader/loader';

export function PostDetails() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost>();
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();

  useEffect(() => {
    http()
      .get(`/posts/${postId}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
   
  }, [postId]);
   if (loading) return <Loader />;
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
