import { Button } from '@/components/button';
import { Input } from '@/components/input/input';
import { usePost } from '@/hooks/usePost';
import { Form, Formik, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';
import style from './login.module.scss';
import { authService } from '@/hooks/useAuth';
import * as Yup  from 'yup';

export function FormLogin() {
  const navigate = useNavigate();

  const { registerData } = usePost();

  const handleSubmit = (values: FormikValues) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    try {
      registerData({ url: '/user/signin', data: user }).then((response) => {
        authService.login({ token: response.token });
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const schema = Yup.object().shape({
    username: Yup.string().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  })

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form onSubmit={formik.handleSubmit}>
            <fieldset className={style.container}>
              <label>
                <Input title="Nome de usuário" name="username" type="text" />
              </label>

              <label>
                <Input title="Senha" name="password" type="password" />
              </label>
            </fieldset>

            <div className={style.buttons}>
              <Button
                option="secondary"
                type="button"
                onClick={() => navigate('/')}
              >
                Voltar
              </Button>
              <Button option="primary" type="submit">
                Entrar
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
