import { usePost } from "@/hooks/usePost";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import style from "./createPost.module.scss";
import { useEffect, useState } from "react";
import { http } from "@/utils/axios";
import { IPost } from "@/interface/post.interface";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button";
import { Exceptions } from "../exception";

interface RegisterPost {
  title: string;
  content: string;
  urlImage: string;
  teacher_id: number;
}

export function FormPost() {
  const [posts, setPosts] = useState<IPost>();
  const [isMounted, setIsMounted] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const { registerData, error } = usePost();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await http().get(`/posts/${id}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      }
    };

    if (id) {
      isMounted;

      fetchPost();

      return () => {
        setIsMounted(false);
      };
    }
  }, [id]);

  if (id && !posts) return <Exceptions />;

  const initialValues = {
    title: posts?.title,
    content: posts?.content,
    urlImage: posts?.urlimage,
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .required("Campo obrigatório")
      .max(255, "Máximo de 255 caracteres"),
    content: Yup.string()
      .required("Campo obrigatório")
      .min(200, "Mínimo de 200 caracteres"),
    urlImage: Yup.string().required("Campo obrigatório").url("URL inválida"),
  });

  const handleSubmit = (values: FormikValues) => {
    const post: RegisterPost = {
      title: values.title,
      content: values.content,
      urlImage: values.urlImage,
      teacher_id: 1,
    };

    if (id) {
      registerData<RegisterPost>({
        url: `/admin/posts/${id}`,
        data: post,
      }).then((response) => {
        console.log(response);
        if (response?.status === 200) {
          navigate("/admin/posts");
        } else {
          console.log(error);
        }
      });
    } else {
      registerData<RegisterPost>({ url: "/admin/posts", data: post }).then(
        (response) => {
          console.log(response);
          if (response?.status === 201) {
            navigate("/admin/posts");
          } else {
            console.log(error);
          }
        }
      );
    }
  };

  return (
    <section className={style.sectionWrapper}>
      <h2>{id ? <p>Editar postagem</p> : <p>Crie uma nova postagem</p>}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <fieldset className={style.container}>
                <label>
                  {id ? (
                    <Input
                      title="Título"
                      name="title"
                      type="text"
                      placeholder={posts?.title}
                    />
                  ) : (
                    <Input title="Título" name="title" type="text" />
                  )}
                </label>
                <label></label>
                <label>
                  {id ? (
                    <Input
                      title="URL da imagem"
                      name="urlImage"
                      type="text"
                      placeholder={posts?.urlimage}
                    />
                  ) : (
                    <Input title="URL da imagem" name="urlImage" type="text" />
                  )}
                </label>
                <label className={style.textarea}>
                  <span>Conteúdo</span>
                  {id ? (
                    <Field
                      className={style.inputTextarea}
                      name="content"
                      as="textarea"
                      placeholder={posts?.content}
                    />
                  ) : (
                    <Field
                      className={style.inputTextarea}
                      name="content"
                      as="textarea"
                    />
                  )}
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
                    onClick={
                      id ? () => navigate("/admin/posts") : () => navigate("/")
                    }
                  >
                    Voltar
                  </Button>
                  <Button option="primary" type="submit">
                    {id ? "Editar" : "Criar"}
                  </Button>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Formik>
      {error && (
        <p>
          Não foi possível{" "}
          {id ? "editar a postagem" : "criar uma nova Postagem"}. Tente
          novamente mais tarde!
        </p>
      )}
    </section>
  );
}
