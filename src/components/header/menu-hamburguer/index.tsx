import { useState } from 'react';
import style from './menu.module.scss';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../button';

interface Props {
  isLogged: boolean;
}

export function MenuHamburguer({ isLogged }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
                  Create Post
                </Link>
                <Link className={style.linkNavigate} to={'/profile'}>
                  Profile
                </Link>
              </div>
              <Link className={style.linkNavigate} to={'/logout'}>
                Logout
              </Link>
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
