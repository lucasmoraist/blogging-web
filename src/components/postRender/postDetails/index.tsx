import { IPost } from "@/interface/post.interface";
import style from "./post.module.scss";

interface Props {
  post: IPost;
}

export function Post({ post }: Props): JSX.Element {
  const dateFormated = (date: string) => {
    const postDate = new Date(date);

    const day = postDate.getDate().toString().padStart(2, "0");
    const month = (postDate.getMonth() + 1).toString().padStart(2, "0");
    const year = postDate.getFullYear().toString().slice(2);
    const hours = postDate.getHours().toString().padStart(2, "0");
    const minutes = postDate.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} • ${hours}:${minutes}`;
  };

  return (
    <div className={style.postWrapper}>
      <div className={style.post}>
        <div className={style.postImage}>
          <img src={post.urlimage} alt="" />
        </div>

        <div className={style.postContent}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      </div>

      <div className={style.postInfo}>
        <p>Postado: {dateFormated(post.createdat)}</p>
        {/* <p>Criado por: {post.teacher.name}</p> */}
      </div>
    </div>
  );
}
