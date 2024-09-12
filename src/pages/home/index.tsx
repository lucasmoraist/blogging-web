import { PostRender } from '@/components/postRender';
import style from './styles/home.module.scss';
import { Aside } from './aside';
import { useEffect, useState } from 'react';
import { IPost } from '@/interface/post.interface';
import { http } from '@/utils/axios';
import { SearchForm } from './search';

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    http()
      .get('/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
      <div className={style.homeContainer}>
        <div className={style.feed}>
        <SearchForm />
          {posts.slice(0, 5).map((post) => (
            <div key={post.id}>
              <PostRender post={post} />
            </div>
          ))}
        </div>
        <div className={style.randomPosts}>
          <Aside posts={posts} />
        </div>
      </div>
  );
}
