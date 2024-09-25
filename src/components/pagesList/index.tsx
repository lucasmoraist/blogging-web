import { ChevronLeft, ChevronRight } from "lucide-react";
import style from "./pagesList.module.scss";

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
    <ul className={style.pagesList}>
      <li>
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>
      </li>

      {totalNumberOfPages > 4 ? (
        <>
          {/* Primeira página sempre visível */}
          <li>
            <button
              onClick={() => handlePagination(1)}
              className={currentPage === 1 ? style.active : ""}
            >
              {pageNumberLabel(1)}
            </button>
          </li>

          {/* Adiciona "..." se a página atual for maior que 3 */}
          {currentPage > 3 && <li>...</li>}

          {/* Exibe as páginas ao redor da atual */}
          {Array.from({ length: 5 }, (_, index) => {
            const pageIndex = currentPage - 2 + index; // Mostra 5 páginas ao redor da página atual
            return (
              pageIndex > 1 &&
              pageIndex < totalNumberOfPages && ( // Exibe as páginas intermediárias
                <li key={pageIndex}>
                  <button
                    onClick={() => handlePagination(pageIndex)}
                    className={currentPage === pageIndex ? style.active : ""}
                  >
                    {pageNumberLabel(pageIndex)}
                  </button>
                </li>
              )
            );
          })}

          {/* Adiciona "..." se a página atual for antes da penúltima página */}
          {currentPage < totalNumberOfPages - 2 && <li>...</li>}

          {/* Última página sempre visível */}
          <li>
            <button
              onClick={() => handlePagination(totalNumberOfPages)}
              className={currentPage === totalNumberOfPages ? style.active : ""}
            >
              {pageNumberLabel(totalNumberOfPages)}
            </button>
          </li>
        </>
      ) : (
        // Caso tenha 4 ou menos páginas, mostra todas as páginas
        Array.from({ length: totalNumberOfPages }, (_, index) => (
          <li key={index + 1}>
            <button
              onClick={() => handlePagination(index + 1)}
              className={currentPage === index + 1 ? style.active : ""}
            >
              {pageNumberLabel(index + 1)}
            </button>
          </li>
        ))
      )}

      <li>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalNumberOfPages}
        >
          <ChevronRight />
        </button>
      </li>
    </ul>
  );
}
