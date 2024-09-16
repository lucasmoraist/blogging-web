import { Button } from '@/components/button';
import { Input } from '@/components/input/input';
import { ErrorMessage, Field, Form, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import style from './styles/createPost.module.scss';
import { IPost } from '@/interface/post.interface';

interface Props {
  formik: FormikProps<{
    title: string | undefined;
    content: string | undefined;
    urlImage: string | undefined;
  }>;
  posts: IPost | undefined;
  id: string | undefined;
}

export default function FormTemplate({ formik, posts, id }: Props) {
  const navigate = useNavigate();
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
            onClick={id ? () => navigate('/admin/posts') : () => navigate('/')}
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
}
