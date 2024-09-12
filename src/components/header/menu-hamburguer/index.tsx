import { useState } from 'react';
import style from './menu.module.scss';
import { List, LogOut, Menu, SquarePen, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../button';
import { authService } from '@/hooks/useAuth';

interface Props {
  isLogged: boolean;
}

export function MenuHamburguer({ isLogged }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className={style.menuHamburguer}>
      <nav>
        <Menu
          className={`${style.burguerBar} ${
            isOpen ? style.clicked : style.unclicked
          }`}
          onClick={toggleMenu}
        />
      </nav>

      <div
        className={`${style.overlay} ${isOpen ? style.visible : style.hidden}`}
        onClick={toggleMenu}
      ></div>

      <div className={`${style.menu} ${isOpen ? style.visible : style.hidden}`}>
        <div className={style.closeButton} onClick={toggleMenu}>
          <X />
        </div>
        <ul className={`${!isLogged && style.disconnected}`}>
          {isLogged ? (
            <div className={style.links}>
            <div>
              <Link className={style.linkNavigate} to={'/signup'}>
                <SquarePen /> Write
              </Link>
              <Link className={style.linkNavigate} to={'/profile'}>
                <List /> Posts
              </Link>
            </div>
            {isLogged ? (
              <button className={style.linkNavigate} onClick={handleLogout}>
                <LogOut /> Logout
              </button>
            ) : (
              ''
            )}
          </div>
          ) : (
            <>
              <Button option="secondary" onClick={() => navigate('/register')}>Sign-up</Button>
              <Button option="primary" onClick={() => navigate('/login')}>Sign-in</Button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
