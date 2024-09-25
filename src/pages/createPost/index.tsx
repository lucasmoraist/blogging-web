import { usePost } from "@/hooks/usePost";
import { Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import style from "./createPost.module.scss";
import { useEffect, useState } from "react";
import { IPost } from "@/interface/post.interface";
import { Exceptions } from "../exception";
import Loader from "@/components/loader/loader";
import { getPost } from "./service/getPost";
import { createPost } from "./service/createPost";
import { updatePost } from "./service/updatePost";
import UpdateForm from "./updateForm";
import { CreateForm } from "./createForm";
import { useParams } from "react-router-dom";

interface RegisterPost {
  title: string;
  content: string;
  urlImage: string;
  teacher_id: number;
}

export function FormPost() {
  const [posts, setPosts] = useState<IPost>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const { error } = usePost();

  useEffect(() => {
    if (id) {
      getPost({ id, setPosts, setLoading });
    }
  }, [id]);

  if (id && loading) return <Loader />;
  if (id && !posts) return <Exceptions statusCode={404} />;

  const initialValues = {
    title: id ? posts?.title : "",
    content: id ? posts?.content : "",
    urlImage: id ? posts?.urlimage : "",
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
      updatePost({ id, post });
    } else {
      createPost({ post });
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
              {id ? <UpdateForm posts={posts} /> : <CreateForm />}
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
