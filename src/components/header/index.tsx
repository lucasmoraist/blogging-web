import style from './header.module.scss';
import logo from '/assets/img/logo.png';
import { MenuHamburguer } from './menu-hamburguer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { authService } from '@/hooks/useAuth';
import { memo, useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { List, LogOut, SquarePen } from 'lucide-react';
import { SearchForm } from '@/pages/home/search';

function Header(): JSX.Element {
  const [isLogged, setIsLogged] = useState(authService.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    const dispose = autorun(() => {
      setIsLogged(authService.isLogged);
    });
    return () => dispose();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className={style.headerWrapper}>
      <div className={style.logo}>
        <Link to={'/'}><img src={logo} alt="Logo do blog" /></Link>
      </div>
      <SearchForm />
      <div className={style.menuMobile}>
        <MenuHamburguer isLogged={isLogged} />
      </div>

      <div className={style.menu}>
        {isLogged ? (
          <div className={style.links}>
            <div>
              <Link className={style.linkNavigate} to={'/admin/create'}>
                <SquarePen /> Escrever Post
              </Link>
              <Link className={style.linkNavigate} to={'/admin/posts'}>
                <List /> Posts
              </Link>
            </div>
            {isLogged ? (
              <button className={style.linkNavigate} onClick={handleLogout}>
                <LogOut /> Sair
              </button>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className={style.buttons}>
            <Button option="secondary" onClick={() => navigate('/register')}>
              Cadastre-se
            </Button>
            <Button option="primary" onClick={() => navigate('/login')}>
              Entrar
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default memo(Header);