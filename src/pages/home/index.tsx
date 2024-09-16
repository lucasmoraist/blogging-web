import style from './styles/home.module.scss';
import { Aside } from './aside';
import { useEffect, useState } from 'react';
import { IPost } from '@/interface/post.interface';
import { http } from '@/utils/axios';
import { SearchForm } from './search';
import { Feed } from './feed';

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async (signal: AbortSignal) => {
    try {
      const response = await http().get<IPost[]>('/posts', { signal });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('Request canceled');
        } else {
          throw new Error('Error when searching for posts: ' + error.message);
        }
      } else {
        throw new Error('Unexpected error');
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller.signal)
      .then(data => {
        if (data) setPosts(data);
        setLoading(true);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={style.homeContainer}>
      <div className={style.feed}>
        <SearchForm />
        {loading ? <p>loading...</p> : error ? <p>{error}</p> : <Feed posts={posts} />}
      </div>
      <div className={style.randomPosts}>
        <Aside posts={posts} />
      </div>
    </div>
  );
}
