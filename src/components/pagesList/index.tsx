import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

interface Props {
  currentPage: number;
  handlePagination: (page: number) => void;
  totalNumberOfPages: number;
}

export function PagesList({
  currentPage,
  handlePagination,
  totalNumberOfPages,
}: Props) {
  const pageNumberLabel = (currentPage: number) => {
    let pageLabel = "";
    pageLabel = currentPage.toString();
    return pageLabel;
  };

  return (
    <List>
      <ListItem>
        <Button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
      </ListItem>

      {totalNumberOfPages > 4 ? (
        <>
          <ListItem>
            <Button
              onClick={() => handlePagination(1)}
              active={currentPage === 1}
            >
              {pageNumberLabel(1)}
            </Button>
          </ListItem>

          {currentPage > 3 && <ListItem>...</ListItem>}

          {Array.from({ length: 5 }, (_, index) => {
            const pageIndex = currentPage - 2 + index;
            return (
              pageIndex > 1 &&
              pageIndex < totalNumberOfPages && (
                <ListItem key={pageIndex}>
                  <Button
                    onClick={() => handlePagination(pageIndex)}
                    active={currentPage === pageIndex}
                  >
                    {pageNumberLabel(pageIndex)}
                  </Button>
                </ListItem>
              )
            );
          })}

          {currentPage < totalNumberOfPages - 2 && <ListItem>...</ListItem>}

          <ListItem>
            <Button
              onClick={() => handlePagination(totalNumberOfPages)}
              active={currentPage === totalNumberOfPages}
            >
              {pageNumberLabel(totalNumberOfPages)}
            </Button>
          </ListItem>
        </>
      ) : (
        Array.from({ length: totalNumberOfPages }, (_, index) => (
          <ListItem key={index + 1}>
            <Button
              onClick={() => handlePagination(index + 1)}
              active={currentPage === index + 1}
            >
              {pageNumberLabel(index + 1)}
            </Button>
          </ListItem>
        ))
      )}

      <ListItem>
        <Button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalNumberOfPages}
        >
          <ChevronRight />
        </Button>
      </ListItem>
    </List>
  );
}

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin: 0;
`;

const Button = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  color: ${({ active }) => (active ? '#f39c12' : '#023047')};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  svg {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 425px) {
    font-size: 12px;
  }
`;
