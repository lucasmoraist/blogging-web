import { IPost } from '@/interface/post.interface';
import style from './post.module.scss';

interface Props {
  post: IPost;
}

export function Post({ post }: Props) {
  const postDate = (date: string) => {
    const today = new Date();
    const postDate = new Date(date);

    const diff = today.getTime() - postDate.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours <= 1) {
      return 'New';
    } else {
      const day = postDate.getDate().toString().padStart(2, '0');
      const month = (postDate.getMonth() + 1).toString().padStart(2, '0');
      const year = postDate.getFullYear().toString().slice(2);
      const hours = postDate.getHours().toString().padStart(2, '0');
      const minutes = postDate.getMinutes().toString().padStart(2, '0');

      return `${day}/${month}/${year} •${hours}:${minutes}`;
    }
  };

  return (
    <div className={style.postContainer}>
      <div className={style.postImage}>
        <img src={post.image} alt={`Imagem da postagem sobre ${post.title}`} />
      </div>
      <div className={style.postInfoWrapper}>
        <div className={style.postInfo}>
          <h2>{post.title}</h2>
          <div className={style.postNotification}>
            {postDate(post.createdAt) === 'New' ? (
              <span className={style.postNew}>New</span>
            ) : (
              <span className={style.postOld}>{postDate(post.createdAt)}</span>
            )}
          </div>
        </div>
        <div className={style.postDescription}>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
