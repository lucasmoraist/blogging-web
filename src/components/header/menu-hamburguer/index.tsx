import { useState } from "react";
import styled from "styled-components";
import { List, LogOut, Menu, SquarePen, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../button";
import { authService } from "@/hooks/useAuth";

interface Props {
  isLogged: boolean;
}

export function MenuHamburguer({ isLogged }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <Container>
      <nav>
        <StyledMenu
          className={isOpen ? 'clicked' : 'unclicked'}
          onClick={toggleMenu}
        />
      </nav>

      <Overlay className={isOpen ? 'visible' : 'hidden'} onClick={toggleMenu} />

      <MenuContainer className={isOpen ? 'visible' : 'hidden'}>
        <CloseButton onClick={toggleMenu}>
          <X />
        </CloseButton>
        <MenuList className={!isLogged ? 'disconnected' : ''}>
          {isLogged ? (
            <Links>
              <LinkStyled to={"/admin/create"}>
                <SquarePen /> Escrever Post
              </LinkStyled>
              <LinkStyled to={"/admin/posts"}>
                <List /> Posts
              </LinkStyled>
              <LogoutButton onClick={handleLogout}>
                <LogOut /> Sair
              </LogoutButton>
            </Links>
          ) : (
            <>
              <Button option="secondary" onClick={() => navigate("/register")}>
                Cadastre-se
              </Button>
              <Button option="primary" onClick={() => navigate("/login")}>
                Entrar
              </Button>
            </>
          )}
        </MenuList>
      </MenuContainer>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
`;

const StyledMenu = styled(Menu)`
  color: #f39c12; // $color-mustard-yellow
  width: 30px;
  height: 30px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  pointer-events: none;

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

const MenuContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: rgb(42, 42, 42);
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;

  &.visible {
    transform: translateX(0);
  }

  &.hidden {
    transform: translateX(100%);
  }
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 50px 20px;
  margin: 0;
  height: 100%;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
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

  @media (max-width: 425px) {
    font-size: 16px; // Ajuste para telas pequenas
  }
`;

const CloseButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  svg {
    width: 30px;
    height: 30px;
    color: #f39c12; // $color-mustard-yellow
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