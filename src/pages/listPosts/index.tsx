import style from './listPosts.module.scss';
import { TableComponent } from './table';

export function ListPosts() {
  return (
    <section className={style.sectionWrapper}>
      <h2>Lista de posts</h2>

      <TableComponent />
    </section>
  );
}
