import { useState } from 'react';
import style from './styles/search.module.scss';
import { http } from '@/utils/axios';
import { Search } from 'lucide-react';

export function SearchForm() {
  const [search, setSearch] = useState<string>('');

  // Definir oque irá acontecer após a busca
  // 1. Abrir o post direto
  // 2. Mostrar os posts que contém a palavra
  // Se for a opção 2, criar um novo componente para mostrar os resultados ou um modal abaixo do input com os resultados
  const searchPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      http()
        .get('/posts/search', { params: { term: search } })
        .then((response) => {
          console.log(response.data);
        });

      setSearch('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value);
    }
  };

  return (
    <form className={style.searchWrapper}>
      <div className={style.search}>
        <input
          type="search"
          placeholder="Busque por aqui"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={searchPost}>
          <Search />
        </button>
      </div>
    </form>
  );
}
