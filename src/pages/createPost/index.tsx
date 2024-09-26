import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import style from './createPost.module.scss';
import { useEffect, useState } from 'react';
import { IPost } from '@/interface/post.interface';
import { Exceptions } from '../exception';
import Loader from '@/components/loader/loader';
import UpdateForm from './updateForm';
import { CreateForm } from './createForm';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '@/utils/apiService';
import { IRegisterPost } from '@/interface/register-post.interface';

export function FormPost() {
  const [posts, setPosts] = useState<IPost>();
  const [loading, setLoading] = useState(true);
  const [error] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      apiService.getPost(id).then((response) => {
        if (response) {
          setPosts(response.data);
          setLoading(false);
        }
      });
    }
  }, [id]);

  if (id && loading) return <Loader />;
  if (id && !posts) return <Exceptions statusCode={404} />;

  const initialValues = {
    title: id ? posts?.title : '',
    content: id ? posts?.content : '',
    urlImage: id ? posts?.urlimage : '',
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .required('Campo obrigatório')
      .max(255, 'Máximo de 255 caracteres'),
    content: Yup.string()
      .required('Campo obrigatório')
      .min(200, 'Mínimo de 200 caracteres'),
    urlImage: Yup.string().required('Campo obrigatório').url('URL inválida'),
  });

  const handleSubmit = (values: FormikValues) => {
    const post: IRegisterPost = {
      title: values.title,
      content: values.content,
      urlImage: values.urlImage,
      teacher_id: 1,
    };

    if (id) {
      apiService.updatePost(id, posts);
      navigate('/admin/posts');
    } else {      
      apiService.createPost(post);
      navigate('/admin/posts');
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
            <>
              {id ? (
                <UpdateForm posts={posts} formik={formik} />
              ) : (
                <CreateForm formik={formik} />
              )}
            </>
          );
        }}
      </Formik>
      {error && (
        <p>
          Não foi possível{' '}
          {id ? 'editar a postagem' : 'criar uma nova Postagem'}. Tente
          novamente mais tarde!
        </p>
      )}
    </section>
  );
}
