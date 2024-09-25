import { Button } from "@/components/button";
import { Input } from "@/components/input/input";
import { ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import style from "./createPost.module.scss";
import { IPost } from "@/interface/post.interface";
import { memo } from "react";

interface Props {
  posts: IPost | undefined;
}

function UpdateForm({ posts }: Props) {
  const navigate = useNavigate();
  console.log(posts);
  
  return (
    <fieldset className={style.container}>
      <label>
        <Input
          title="Título"
          name="title"
          type="text"
          placeholder={posts?.title}
        />
      </label>
      <label>
        <Input
          title="URL da imagem"
          name="urlImage"
          type="text"
          placeholder={posts?.urlimage}
        />
      </label>
      <label className={style.textarea}>
        <span>Conteúdo</span>
        <Field
          className={style.inputTextarea}
          name="content"
          as="textarea"
          placeholder={posts?.content}
        />
        <ErrorMessage name="content">
          {(msg) => (
            <div style={{ marginTop: "4px", width: "260px" }}>
              <span style={{ color: "red" }}>{msg}</span>
            </div>
          )}
        </ErrorMessage>
      </label>

      <div className={style.buttons}>
        <Button
          option="secondary"
          type="button"
          onClick={() => navigate("/admin/posts")}
        >
          Voltar
        </Button>
        <Button option="primary" type="submit">
          Editar
        </Button>
      </div>
    </fieldset>
  );
}

export default memo(UpdateForm);
