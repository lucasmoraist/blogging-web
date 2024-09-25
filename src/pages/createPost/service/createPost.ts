import { usePost } from "@/hooks/usePost";
import { IRegisterPost } from "@/interface/register-post.interface";
import { useNavigate } from "react-router-dom";

interface Props {
  post: IRegisterPost;
}

export const createPost = async ({ post }: Props) => {
  const { registerData } = usePost();
  const navigate = useNavigate();

  registerData<IRegisterPost>({ url: "/admin/posts", data: post })
    .then((response) => {
      if (response?.status === 201) {
        navigate("/admin/posts");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
