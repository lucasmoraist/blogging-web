import { Input } from '@/components/input/input';
import { usePost } from '@/hooks/usePost';
import { Field, Form, Formik, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import style from './createPost.module.scss';
import { Button } from '@/components/button';

interface RegisterPost {
  title: string;
  content: string;
  urlImage: string;
  teacher_id: number;
}

export function CreatePost() {
  const { registerData, error } = usePost();
  const navigate = useNavigate();

  const handleSubmit = (values: FormikValues) => {
    console.log(values);

    const post: RegisterPost = {
      title: values.title,
      content: values.content,
      urlImage: values.urlImage,
      teacher_id: 1,
    };

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

  return (
    <section className={style.sectionWrapper}>
      <h2>Crie uma nova postagem</h2>
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
                  <Input title="Título" name="title" type="text" />
                </label>
                <label>
                  <Input title="URL da imagem" name="urlImage" type="text" />
                </label>
                <label className={style.textarea}>
                  <span>Conteúdo</span>
                  <Field
                    className={style.inputTextarea}
                    name="content"
                    as="textarea"
                  />
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
                    Criar
                  </Button>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Formik>
      {error && (
        <p>
          Não foi possível criar uma nova Postagem. Tente novamente mais tarde!
        </p>
      )}
    </section>
  );
}
