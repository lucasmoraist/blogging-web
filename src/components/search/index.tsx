import { useEffect, useState } from "react";
import style from "./search.module.scss";
import { http } from "@/utils/axios";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  content: string;
}

export function SearchForm(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false); // Novo estado para verificar se há resultados
  const navigate = useNavigate();

  const fetchPosts = async (term: string) => {
    try {
      const response = await http().get("/posts/search", { params: { term } });
      const results = response.data;
      setSearchResults(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      const delayDebounceFn = setTimeout(() => {
        fetchPosts(search);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  }, [search]);

  const handleResultClick = (id: string) => {
    setSearch("");
    navigate(`/post/${id}`);
  };

  return (
    <form className={style.searchWrapper}>
      <div className={style.search}>
        <input
          type="search"
          placeholder="Pesquise aqui"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {searchResults.length > 0 ? (
        <div className={style.results}>
          <ul>
            {searchResults.slice(0, 3).map((post) => (
              <li key={post.id} onClick={() => handleResultClick(post.id)}>
                {post.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        noResults && <div className={style.results}>
            <ul>
                <li>Sem resultados</li>
            </ul>
        </div>
      )}
    </form>
  );
}
