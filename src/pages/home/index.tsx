import { Post } from '@/components/post';
import posts from '@/data/posts.json';
import style from './home.module.scss';

export function Home() {
    return <div className={style.homeContainer}>
        {posts.slice(0, 5).map(post => (
            <div key={post.id}>
                <Post post={post}/>
            </div>
        ))}
    </div>
}