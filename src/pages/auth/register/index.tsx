import { usePost } from '@/hooks/usePost';
import { ITeacher } from '@/interface/teacher.interface';
import { IUser } from '@/interface/user.interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div>
        <h2>Crie sua conta</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
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
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </fieldset>

          <button type="button" onClick={() => navigate('/')}>
            Voltar
          </button>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </section>
  );
}
