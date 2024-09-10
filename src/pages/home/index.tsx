import { PostRender } from '@/components/postRender';
import posts from '@/data/posts.json';
import style from './styles/home.module.scss';
import { Aside } from './aside';

export function Home() {
  return (
    <div className={style.homeContainer}>
      <div className={style.feed}>
        {posts.slice(0, 5).map((post) => (
          <div key={post.id}>
            <PostRender post={post} />
          </div>
        ))}
      </div>
      <div className={style.randomPosts}>
        <Aside posts={posts}/>
      </div>
    </div>
  );
}
