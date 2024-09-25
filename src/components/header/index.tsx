import logo from "/assets/img/school_blog.png";
import { MenuHamburguer } from "./menu-hamburguer";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { authService } from "@/hooks/useAuth";
import { memo, useEffect, useState } from "react";
import { autorun } from "mobx";
import { List, LogOut, SquarePen } from "lucide-react";
import { SearchForm } from "../search";
import styled from "styled-components";

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
    navigate("/login");
  };

  return (
    <HeaderWrapper>
      <Logo>
        <Link to="/">
          <img src={logo} alt="Logo do blog" />
        </Link>
        <SearchForm />
      </Logo>

      <MenuMobile>
        <MenuHamburguer isLogged={isLogged} />
      </MenuMobile>

      <Menu>
        {isLogged ? (
          <Links>
            <div>
              <LinkStyled to="/admin/create">
                <SquarePen /> Escrever Post
              </LinkStyled>
              <LinkStyled to="/admin/posts">
                <List /> Posts
              </LinkStyled>
            </div>
            <LogoutButton onClick={handleLogout} aria-label="Sair">
              <LogOut /> Sair
            </LogoutButton>
          </Links>
        ) : (
          <Buttons>
            <Button option="secondary" onClick={() => navigate("/register")}>
              Cadastre-se
            </Button>
            <Button option="primary" onClick={() => navigate("/login")}>
              Entrar
            </Button>
          </Buttons>
        )}
      </Menu>
    </HeaderWrapper>
  );
}

export default memo(Header);

const HeaderWrapper = styled.header`
  background-color: #219ebc; // $color-secondary
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 61px; 
  padding: 0 20px;
  transition: height 0.3s ease;

  @media (min-width: 768px) {
    height: 70px;
  }

  @media (min-width: 1024px) {
    height: 100px;
  }

  @media (min-width: 1280px) {
    height: 160px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  img {
    width: auto;
    height: 33px;
    transition: height 0.3s ease;

    @media (min-width: 768px) {
      height: 40px;
    }

    @media (min-width: 1024px) {
      height: 48px;
    }

    @media (min-width: 1280px) {
      height: 80px;
    }
  }
`;

const MenuMobile = styled.div`
  display: flex;

  @media (min-width: 768px) {
    display: none; // Exibe o menu em telas maiores
  }
`;

const Menu = styled.div`
  display: none; // Escondido por padrão

  @media (min-width: 768px) {
    display: flex; // Exibe o menu em telas maiores
  }
`;

const Links = styled.div`
  display: flex;
  gap: 20px;

  div {
    display: flex; // Garante que os links fiquem alinhados
    gap: 20px;
  }
`;

const LinkStyled = styled(Link)`
  color: #f39c12; // $color-mustard-yellow
  text-decoration: none;
  font-size: 18px;
  font-family: 'Roboto', sans-serif; // $font-roboto
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: darken(#f39c12, 10%); // Muda a cor ao passar o mouse
  }
`;

const LogoutButton = styled.button`
  color: #f39c12; // $color-mustard-yellow
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Roboto', sans-serif; // $font-roboto
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;
