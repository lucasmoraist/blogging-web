import { PostRender } from '@/components/postRender';
import { IPost } from '@/interface/post.interface';

interface Props {
  posts: IPost[];
}

export function Feed({ posts }: Props) {
  return (
    <>
      {posts.slice(0, 5).map((post) => (
        <div key={post.id}>
          <PostRender post={post} />
        </div>
      ))}
      
    </>
  );
}
