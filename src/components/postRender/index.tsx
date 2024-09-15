import { IPost } from '@/interface/post.interface';
import { Posts } from './posts';
import { Post } from './postDetails';
import { memo } from 'react';

interface Props {
  id?: string;
  post: IPost;
}

export const PostRender = memo(({ id, post }: Props) => {
  return <>{id === post.id ? <Post post={post} /> : <Posts post={post} />}</>;
})


