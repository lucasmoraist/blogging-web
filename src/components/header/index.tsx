import style from './header.module.scss';
import logo from '/assets/img/logo.png';
import { MenuHamburguer } from './menu-hamburguer';
import { Link } from 'react-router-dom';
import { Button } from '../button';

interface Props {
  isLogged: boolean;
}

export function Header({ isLogged }: Props) {
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
            <Link className={style.linkNavigate} to={'/logout'}>
              Logout
            </Link>
          </div>
        ) : (
          <>
            <Button option="secondary">Sign-up</Button>
            <Button option="primary">Sign-in</Button>
          </>
        )}
      </div>
    </header>
  );
}
