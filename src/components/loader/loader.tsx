import styled, { keyframes } from 'styled-components';

export const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderDiv />
    </LoaderContainer>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media (max-width: 425px) {
    height: 100%; 
  }
`;

const LoaderDiv = styled.div`
  border: 12px solid #f3f3f3;
  border-top: 12px solid #e36414;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;

  @media (max-width: 425px) {
    width: 50px;
    height: 50px;
    border: 8px solid #f3f3f3;
    border-top: 8px solid #e36414;
  }
`;

export default Loader;
