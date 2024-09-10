import { IPost } from '@/interface/post.interface';
import style from './styles/aside.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  posts: IPost[];
}

// Idéia:
// De início os posts que irão aparecer na lateral podem ser apenas posts aleatórios
// Mas pode-se mudar o objetivo e mostrar apenas os posts melhores avaliados
export function Aside({ posts }: Props) {
  const [randomPosts, setRandomPosts] = useState<IPost[]>([]);
  const navigate = useNavigate();

  const getRandomPosts = (postList: IPost[], count: number): IPost[] => {
    return postList.sort(() => Math.random() - 0.5).slice(0, count);
  };

  useEffect(() => {
    const selectedPosts = getRandomPosts(posts, 4);
    setRandomPosts(selectedPosts);
  }, []);

  return (
    <aside className={style.asideContainer}>
      <div className={style.postWrapper}>
        {randomPosts.map((post) => (
          <div key={post.id} className={style.post}>
            <img src={post.image} alt={`Imagem do post sobre ${post.title}`} width={200} />
            <h3 onClick={() => navigate(`/post/${post.id}`)}>{post.title}</h3>
          </div>
        ))}
      </div>
    </aside>
  );
}
