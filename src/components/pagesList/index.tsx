import { ChevronLeft, ChevronRight } from "lucide-react";
import style from "./pagesList.module.scss";

interface Props {
    currentPage: number;
    handlePagination: (page: number) => void;
    totalNumberOfPages: number;
}

export function PagesList({ currentPage, handlePagination, totalNumberOfPages }: Props) {
  
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
      {totalNumberOfPages > 5 ? (
        <>
          {currentPage > 3 && (
            <>
              <li>
                <button onClick={() => handlePagination(1)}>
                  {pageNumberLabel(1)}
                </button>
              </li>
              {currentPage > 4 && <li>...</li>}
            </>
          )}
          {Array.from({ length: 5 }, (_, index) => {
            const pageIndex =
              currentPage > 3 ? currentPage - 2 + index : index + 1;
            return (
              pageIndex <= totalNumberOfPages && (
                <li key={index}>
                  <button onClick={() => handlePagination(pageIndex)}>
                    {pageNumberLabel(pageIndex)}
                  </button>
                </li>
              )
            );
          })}
          {currentPage < totalNumberOfPages - 2 && <li>...</li>}
          {currentPage < totalNumberOfPages - 1 && (
            <li>
              <button onClick={() => handlePagination(totalNumberOfPages)}>
                {pageNumberLabel(totalNumberOfPages)}
              </button>
            </li>
          )}
        </>
      ) : (
        Array.from({ length: totalNumberOfPages }, (_, index) => (
          <li key={index}>
            <button onClick={() => handlePagination(index + 1)}>
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
