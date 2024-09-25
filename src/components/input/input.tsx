import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

interface Props {
  title: string;
  name: string;
  type: string;
  placeholder?: string;
}

export function Input({ title, name, type, placeholder }: Props): JSX.Element {
  return (
    <Container>
      <Title>{title}</Title>
      <StyledInput type={type} name={name} placeholder={placeholder} required />
      <ErrorMessage name={name}>
        {(msg) => (
          <ErrorContainer>
            <ErrorText>{msg}</ErrorText>
          </ErrorContainer>
        )}
      </ErrorMessage>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  color: #219ebc; // $color-secondary
`;

const StyledInput = styled(Field)`
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  margin-top: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #219ebc; // $color-secondary

  @media (min-width: 768px) {
    height: 40px;
  }

  @media (min-width: 1280px) {
    height: 50px;
    font-size: 18px;
  }
`;

const ErrorContainer = styled.div`
  margin-top: 4px;
  width: 260px;
`;

const ErrorText = styled.span`
  color: red;
`;
