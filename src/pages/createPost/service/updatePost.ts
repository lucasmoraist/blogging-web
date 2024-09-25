import { usePost } from "@/hooks/usePost";
import { IRegisterPost } from "@/interface/register-post.interface";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  post: IRegisterPost;
}

export const updatePost = async ({ id, post }: Props) => {
  const { registerData } = usePost();
  const navigate = useNavigate();

  registerData<IRegisterPost>({
    url: `/admin/posts/${id}`,
    data: post,
  }).then((response) => {
    if (response?.status === 200) {
      navigate("/admin/posts");
    }
  });
};
