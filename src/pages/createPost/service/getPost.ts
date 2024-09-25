import { http } from "@/utils/axios";

interface Props {
  id: string;
  setPosts: (posts: any) => void;
  setLoading: (loading: boolean) => void;
}

export const getPost = async ({ id, setPosts, setLoading }: Props) => {
  await http()
    .get(`/posts/${id}`)
    .then((response) => {
      setPosts(response.data);
      setLoading(false);
    }).catch(er => {
        console.error(er);
    });
};
