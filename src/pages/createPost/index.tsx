import { usePost } from '@/hooks/usePost';
import { Formik, FormikValues } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import style from './styles/createPost.module.scss';
import { useEffect, useState } from 'react';
import { http } from '@/utils/axios';
import { NotFound } from '../notFound';
import { IPost } from '@/interface/post.interface';
import Form from './formTemplate';

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
        console.error('Erro ao buscar o post:', error);
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

  if (id && !posts) return <NotFound />;

  const initialValues = {
    title: posts?.title,
    content: posts?.content,
    urlImage: posts?.urlimage,
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
          navigate('/admin/posts');
        } else {
          console.log(error);
        }
      });
    } else {
      registerData<RegisterPost>({ url: '/admin/posts', data: post }).then(
        (response) => {
          console.log(response);
          if (response?.status === 201) {
            navigate('/admin/posts');
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
        {(formik) => <Form formik={formik} id={id} posts={posts} />}
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
