import { IPost } from '@/interface/post.interface';
import style from './srp.module.scss';
import { NotFound } from '@/pages/notFound';
import { useNavigate } from 'react-router-dom';

interface Props {
  posts: IPost[];
};
  // const navigate = useNavigate();
  // onClickSearch = () => {
  //   navigate(`/posts/search/${search}`);
  // }
  


const SearchResultPage = ({ posts }: Props): JSX.Element => {
    return (
      <>
      {posts.length > 0 ? (
        <div className={style.srpContainer}>
        TESTE SRP
      </div>
      ) : (
        <NotFound />
      )}
      </>
    );
};

export default SearchResultPage;

