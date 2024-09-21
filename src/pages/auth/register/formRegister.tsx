import { usePost } from '@/hooks/usePost';
import { ITeacher } from '@/interface/teacher.interface';
import { IUser } from '@/interface/user.interface';
import { useNavigate } from 'react-router-dom';
import style from './register.module.scss';
import { Button } from '@/components/button';
import { Field, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/input/input';
import { schoolSubjects } from '@/pages/home-2/scripts/constants';

export function FormRegister() {
  const { registerData } = usePost();
  const navigate = useNavigate();
  
  const handleSubmit = (values: FormikValues) => {
    const user: IUser = {
      username: values.username,
      password: values.password,
    };

    try {
      registerData<IUser>({ url: '/user', data: user }).then((response) => {
        if (response) {
          const teacher: ITeacher = {
            name: values.name,
            school_subject: values.school_subject,
            user_id: response.data.id,
          };

          registerData<ITeacher>({ url: '/teacher', data: teacher });
          navigate('/login');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    school_subject: Yup.string().required('Seleção obrigatória'),
    username: Yup.string().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    passwordConfirmed: Yup.string().oneOf(
      [Yup.ref('password')],
      'As senhas devem ser iguais'
    ),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        school_subject: '',
        username: '',
        password: '',
        passwordConfirmed: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form onSubmit={formik.handleSubmit}>
            <fieldset className={style.container}>
              <label>
                <Input title="Nome do professor" name="name" type="text" />
              </label>
              <label>
                <Field
                  name="school_subject"
                  as="select"
                  className={style.subjectsDropdrown}
                >
                {schoolSubjects.map((subject, index) => ( 
                    <option value={subject.value} key={index}>{subject.label}</option>
                ))}
                </Field>
              </label>

              <label>
                <Input title="Crie um username" name="username" type="text" />
              </label>

              <label>
                <Input title="Crie uma senha" name="password" type="password" />
              </label>

              <label>
                <Input
                  title="Confirme sua senha"
                  name="passwordConfirmed"
                  type="password"
                />
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
                Cadastrar
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
