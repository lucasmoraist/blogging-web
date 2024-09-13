import { Input } from '@/components/input/input';
import { usePost } from '@/hooks/usePost';
import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import style from './createPost.module.scss';
import { Button } from '@/components/button';
import { useEffect, useState } from 'react';
import { http } from '@/utils/axios';
import { NotFound } from '../notFound';
import { IPost } from '@/interface/post.interface';

interface RegisterPost {
  title: string;
  content: string;
  urlImage: string;
  teacher_id: number;
}

export function FormPost() {
  const { registerData, error } = usePost();
  const [posts, setPosts] = useState<IPost>();
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    http()
      .get(`/posts/${id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (id && !posts) return <NotFound />;

  const schema = Yup.object().shape({
    title: Yup.string()
      .required('Campo obrigatório')
      .max(255, 'Máximo de 255 caracteres'),
    content: Yup.string()
      .required('Campo obrigatório')
      .min(200, 'Mínimo de 200 caracteres'),
    urlImage: Yup.string().required('Campo obrigatório').url('URL inválida'),
  });

  return (
    <section className={style.sectionWrapper}>
      <h2>{id ? <p>Editar postagem</p> : <p>Crie uma nova postagem</p>}</h2>
      <Formik
        initialValues={{
          title: '',
          content: '',
          urlImage: '',
        }}
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
                      <div style={{ marginTop: '4px', width: '260px' }}>
                        <span style={{ color: 'red' }}>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </label>

                <div className={style.buttons}>
                  <Button
                    option="secondary"
                    type="button"
                    onClick={() => navigate('/')}
                  >
                    Voltar
                  </Button>
                  <Button option="primary" type="submit">
                    {id ? 'Editar' : 'Criar'}
                  </Button>
                </div>
              </fieldset>
            </Form>
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
