import { Button } from "@/components/button";
import { Input } from "@/components/input/input";
import { ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import style from "./createPost.module.scss";

export function CreateForm() {
  const navigate = useNavigate();

  return (
    <fieldset className={style.container}>
      <label>
        <Input title="Título" name="title" type="text" placeholder="" />
      </label>
      <label>
        <Input
          title="URL da imagem"
          name="urlImage"
          type="text"
          placeholder=""
        />
      </label>
      <label className={style.textarea}>
        <span>Conteúdo</span>
        <Field
          className={style.inputTextarea}
          name="content"
          as="textarea"
          placeholder=""
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
          Criar
        </Button>
      </div>
    </fieldset>
  );
}
