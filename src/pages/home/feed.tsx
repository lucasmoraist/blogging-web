import { PostRender } from '@/components/postRender';
import { IPost } from '@/interface/post.interface';

interface Props {
  posts?: IPost[];
}

export function Feed({ posts }: Props) {
  return (
    <>
      {posts
        ?.sort(
          (a, b) =>
            new Date(b.createdat).getTime() - new Date(a.createdat).getTime()
        )
        .map((post) => (
          <div key={post.id}>
            <PostRender post={post} />
          </div>
        ))}
    </>
  );
}
