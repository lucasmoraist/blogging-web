import { http } from "@/utils/axios";

interface Props {
    term: string;
    setSearchResults: (results: any) => void;
    setNoResults: (noResults: boolean) => void;
}

export const getByTerm = async ({ term, setSearchResults, setNoResults }: Props) => {
    try {
      const response = await http().get('/posts/search', { params: { term } });
      const results = response.data;
      setSearchResults(results);
      setNoResults(results.length === 0);
    } catch (error) {
      console.error(error);
    }
  };