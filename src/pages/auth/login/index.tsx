import { authService } from '@/hooks/useAuth';
import { usePost } from '@/hooks/usePost';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { registerData } = usePost();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    try {
      registerData({ url: '/user/signin', data: user }).then(response => {
        authService.login({ token: response.token });
      });

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div>
        <h2>Entre com sua conta</h2>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <span>Nome de usuário</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label>
              <span>Senha</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </fieldset>
          <button type='button' onClick={() => navigate('/')}>Voltar</button>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </section>
  );
}
