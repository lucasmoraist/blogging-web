import { usePost } from '@/hooks/usePost';
import { ITeacher } from '@/interface/teacher.interface';
import { IUser } from '@/interface/user.interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './register.module.scss';
import { Button } from '@/components/button';

export function Register() {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { registerData } = usePost();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: IUser = {
      username,
      password,
    };

    try {
      registerData<IUser>({ url: '/user', data: user }).then((response) => {
        if (response) {
          const teacher: ITeacher = {
            name,
            school_subject: school,
            user_id: response.id,
          };

          registerData<ITeacher>({ url: '/teacher', data: teacher });
          navigate('/login')
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={style.sectionWrapper}>
      <h2>Crie sua conta</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className={style.container}>
          <label>
            <span>Nome do professor</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Escola onde atua</span>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Crie um username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Crie uma senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </fieldset>

        <div className={style.buttons}>
          <Button option='secondary' type="button" onClick={() => navigate('/')}>
            Voltar
          </Button>
          <Button option='primary' type="submit">Cadastrar</Button>
        </div>
      </form>
    </section>
  );
}
