import { http } from "@/utils/axios";

interface Props {
    postId: string;
    fetchPosts: Promise<void>;
    setToggleModal: (value: boolean) => void;
}

export const deletePost = ({postId, fetchPosts, setToggleModal}: Props) => {
    http()
      .delete(`/admin/posts/${postId}`)
      .then(() => {
        fetchPosts;
        setToggleModal(false);
      })
      .catch((error) => {
        console.error("Erro ao excluir post:", error);
      });
  };