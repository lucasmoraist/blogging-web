import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getByTerm } from './service/getByTerm';

interface SearchResult {
  id: string;
  title: string;
  content: string;
}

export function SearchForm(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length > 0) {
      const delayDebounceFn = setTimeout(() => {
        getByTerm({ term: search, setSearchResults, setNoResults });
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  }, [search]);

  const handleResultClick = (id: string) => {
    setSearch('');
    navigate(`/post/${id}`);
  };

  return (
    <SearchWrapper>
      <SearchBox>
        <SearchInput
          type="search"
          placeholder="Pesquise aqui"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBox>

      {searchResults.length > 0 ? (
        <Results>
          <ul>
            {searchResults.slice(0, 3).map((post) => (
              <ResultItem
                key={post.id}
                onClick={() => handleResultClick(post.id)}
              >
                {post.title}
              </ResultItem>
            ))}
          </ul>
        </Results>
      ) : (
        noResults && (
          <Results>
            <ul>
              <ResultItem>Sem resultados</ResultItem>
            </ul>
          </Results>
        )
      )}
    </SearchWrapper>
  );
}

const SearchWrapper = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const SearchBox = styled.div`
  width: 154px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-right: 10px;
  border-radius: 30px;

  @media (min-width: 576px) and (max-width: 768px) {
    width: 200px;

    input {
      height: 40px;
    }
  }

  @media (min-width: 768px) {
    width: 280px;

    input {
      height: 45px;
    }
  }

  @media (min-width: 1200px) {
    width: 400px;

    input {
      height: 60px;
      font-size: 22px;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 30px;
  padding: 0 10px;
  font-size: 16px;
  background: transparent;
  cursor: text;

  &:focus {
    outline: none;
    border: none;
  }
`;

const Results = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 30px;
  z-index: 1000;
  max-height: 200px;
  max-width: 254px;
  overflow-y: auto;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media (min-width: 768px) {
    width: 676px;
  }

  @media (min-width: 1200px) {
    max-width: 400px;
    width: 676px;
  }
`;

const ResultItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
