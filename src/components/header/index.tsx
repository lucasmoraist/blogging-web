import style from './header.module.scss';
import logo from '/assets/img/logo.png';
import { MenuHamburguer } from './menu-hamburguer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { authService } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { autorun } from 'mobx';

export function Header() {
  const [isLogged, setIsLogged] = useState(authService.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    const dispose = autorun(() => {
      setIsLogged(authService.isLogged);
    });
    return () => dispose();
  }, []);

  const handleLogout = () => {
    authService.logout(); // Chama o método de logout
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <header className={style.headerWrapper}>
      <div className={style.logo}>
        <img src={logo} alt="Logo do blog" />
      </div>

      <div className={style.menuMobile}>
        <MenuHamburguer isLogged={isLogged} />
      </div>

      <div className={style.menu}>
        {isLogged ? (
          <div className={style.links}>
            <div>
              <Link className={style.linkNavigate} to={'/signup'}>
                Write
              </Link>
              <Link className={style.linkNavigate} to={'/profile'}>
                Profile
              </Link>
            </div>
            {isLogged ? (
              <button className={style.linkNavigate} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className={style.buttons}>
            <Button option="secondary" onClick={() => navigate('/register')}>
              Sign-up
            </Button>
            <Button option="primary" onClick={() => navigate('/login')}>
              Sign-in
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
