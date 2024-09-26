import { ITeacher } from '@/interface/teacher.interface';
import { IUser } from '@/interface/user.interface';
import { useNavigate } from 'react-router-dom';
import style from './register.module.scss';
import { Button } from '@/components/button';
import { Field, Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/input/input';
import { schoolSubjects } from './scripts/constants';
import apiService from '@/utils/apiService';

export function Register() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    school_subject: '',
    username: '',
    password: '',
    passwordConfirmed: '',
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

  const handleSubmit = (values: FormikValues) => {
    const user: IUser = {
      username: values.username,
      password: values.password,
    };

    try {
      apiService.registerUser(user).then((response) => {
        if (response) {
          const teacher: ITeacher = {
            name: values.name,
            school_subject: values.school_subject,
            user_id: response.data.id,
          };

          apiService.registerTeacher(teacher);
          navigate('/login');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={style.sectionWrapper}>
      <h2>Crie sua conta</h2>

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
                  <Input title="Nome do professor" name="name" type="text" />
                </label>
                <label className={style.subjectLabel}>
                  <p>Matéria</p>
                  <Field
                    name="school_subject"
                    as="select"
                    className={style.subjectsDropdown}
                    placeholder="Selecione"
                  >
                    <option value="" disabled selected>Selecione uma matéria</option>
                    {schoolSubjects.map((subject, index) => (
                      <option value={subject.value} key={index}>
                        {subject.label}
                      </option>
                    ))}
                  </Field>
                </label>

                <label>
                  <Input title="Crie um username" name="username" type="text" />
                </label>

                <label>
                  <Input
                    title="Crie uma senha"
                    name="password"
                    type="password"
                  />
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
    </section>
  );
}
