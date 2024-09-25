import { http } from "@/utils/axios";

interface Props {
  postId: string | undefined;
  setPosts: (posts: any) => void;
  setLoading: (loading: boolean) => void;
}

export const getPost = async ({ postId, setPosts, setLoading }: Props) => {
  http()
    .get(`/posts/${postId}`)
    .then((response) => {
      setPosts(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });
};
