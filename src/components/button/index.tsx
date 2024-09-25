import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  option: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  option,
  onClick,
  type,
}: Props): JSX.Element {
  return (
    <>
      {option === "primary" ? (
        <PrimaryButton type={type} onClick={onClick}>
          {children}
        </PrimaryButton>
      ) : (
        <SecondaryButton type={type} onClick={onClick}>
          {children}
        </SecondaryButton>
      )}
    </>
  );
}

const BaseButton = styled.button`
  width: 145px;
  height: 40px;
  border-radius: 31px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: auto;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    transition: ease-in 0.3s;
    box-shadow: 0 4px 4px rgba(39, 174, 96, .2);
  }

  &:not(:hover) {
    transition: ease-in 0.6s;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: auto;
    font-size: 14px;
  }

  @media (min-width: 600px) {
    width: 160px;
    height: 45px;
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    width: 180px;
    height: 50px;
    font-size: 20px;
  }
`;

const PrimaryButton = styled(BaseButton)`
  border: none;
  background-color: #e36414;
  color: #fff;
`;

const SecondaryButton = styled(BaseButton)`
  border: 2px solid #e36414;
  background-color: transparent;
  color: #e36414;
`;
