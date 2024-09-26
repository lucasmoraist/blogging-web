import apiService from '@/utils/apiService';
import styled from 'styled-components';

interface Props {
  setToggleModal: (value: boolean) => void;
  setPostToDelete: (value: string | null) => void;
  postToDelete: string | null;
  fetchPosts: Promise<void>
}

export function ConfirmModal({ postToDelete, setToggleModal, setPostToDelete, fetchPosts }: Props) {
  const deletePost = () => {
    if (postToDelete) {
      apiService.deletePost(postToDelete).then(() => {
        fetchPosts;
        setToggleModal(false);
      });
    }
    setPostToDelete(null);
  };

  return (
    <Overlay>
      <ModalContent>
        <h3>Você deseja mesmo excluir essa postagem?</h3>
        <ButtonContainer>
          <ConfirmButton onClick={deletePost}>Sim</ConfirmButton>

          <CancelButton onClick={() => setToggleModal(false)}>Não</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;
