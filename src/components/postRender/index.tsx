import { IPost } from '@/interface/post.interface';
import { Posts } from './posts';
import { Post } from './postDetails';

interface Props {
  id?: string;
  post: IPost;
}

export function PostRender({ id, post }: Props) {
  return <>{id === post.id ? <Post post={post} /> : <Posts post={post} />}</>;
}
