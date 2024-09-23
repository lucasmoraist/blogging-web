import { strings } from '../scripts/constants';
import style from './srp.module.scss';
import SearchResultPage from './search-result-page';
import { IPost } from '@/interface/post.interface';

interface Props {
    posts: IPost[];
}

export function Srp({ posts }: Props): JSX.Element {
  return (
    <section className={style.srpContainer}>
      <h2>{strings.SRP_TITLE}</h2>
        <SearchResultPage posts={posts} />
    </section>
  );
}
