import "./style.scss";

type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
};

const Pagination = ({
  totalCount,
  pageSize,
  onChange,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  

  const handlePageChange = (page: number | string) => {
    if (typeof page === "string") {
      if (
        (page === "+" && currentPage === totalPages) ||
        (page === "-" && currentPage === 1)
      )
        return;

      if (page === "+") {
        onChange(++currentPage);
      } else {
        onChange(--currentPage);
      }
    } else {
      onChange(page);
    }
  };

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li className="pagination__arrow" onClick={() => handlePageChange("-")}>
          &larr;{" "}
        </li>
        {Array.from(Array(totalPages)).map((e, i) => {
          const isActive = currentPage === i + 1;
          return (
            <li
              key={i}
              onClick={() => handlePageChange(i++)}
              className={`pagination__item ${
                isActive ? "pagination__item--active" : ""
              }`}
            >
              {++i}
            </li>
          );
        })}
        <li className="pagination__arrow" onClick={() => handlePageChange("+")}>
          &rarr;{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
