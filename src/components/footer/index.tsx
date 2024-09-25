import { memo } from "react";
import styled from "styled-components";

function Footer(): JSX.Element {
  return (
    <StyledFooter>
      <Paragraph>&copy; Desenvolvido em 2024 • Grupo 8</Paragraph>
    </StyledFooter>
  );
}

export default memo(Footer);

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #219ebc;
  width: 100%;
  padding: 20px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 0;
  }

  @media (min-width: 992px) {
    padding: 40px 0;
  }

  @media (min-width: 1200px) {
    padding: 50px 0;
  }
`;

const Paragraph = styled.p`
  color: #f39c12;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 992px) {
    font-size: 18px;
  }

  @media (min-width: 1200px) {
    font-size: 24px;
  }
`;
