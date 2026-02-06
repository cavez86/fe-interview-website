import styles from "./pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

type Page = number | "ellipsis_prev" | "ellipsis_next";

const getPageList = (
  totalPages: PaginationProps["totalPages"],
  currentPage: PaginationProps["currentPage"],
) => {
  const pages: Page[] = [];

  // Always show first page
  pages.push(1);

  // Add ellipsis if current page is far from start
  if (currentPage > 4) {
    pages.push("ellipsis_prev");
  }

  // Show pages around current page
  for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
    pages.push(i);
  }

  // Add ellipsis if current page is far from end
  if (currentPage < totalPages - 3) {
    pages.push("ellipsis_next");
  }

  // Always show last page if there's more than one page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}) => {
  const pages = getPageList(totalPages, currentPage);

  return (
    <div className={styles["test-pagination"]}>
      {pages.length > 1 && (
        <button
          type="button"
          className={styles["test-pagination__button"]}
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      {pages.map((page) =>
        page.toString().startsWith("ellipsis") ? (
          <div className={styles["test-pagination__ellipsis"]} key={page}>
            &#8230;
          </div>
        ) : (
          <button
            type="button"
            className={
              page === currentPage
                ? `${styles["test-pagination__button"]} ${styles["test-pagination__button--current"]}`
                : styles["test-pagination__button"]
            }
            key={page}
            onClick={typeof page === "number" ? () => onPageChange(page) : undefined}
          >
            {page}
          </button>
        ),
      )}
      {pages.length > 1 && (
        <button
          type="button"
          className={styles["test-pagination__button"]}
          disabled={currentPage === totalPages}
          onClick={onNext}
        >
          Next
        </button>
      )}
    </div>
  );
};
