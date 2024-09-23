import { IPost } from '@/interface/post.interface';
import { Post } from './postDetails';
import { memo } from 'react';
import { Posts } from './posts';

interface Props {
  id?: string;
  post: IPost;
}

export const PostRender = memo(({ id, post }: Props): JSX.Element => {
  return <>{id === post.id ? <Post post={post} /> : <Posts post={post} />}</>;
});


