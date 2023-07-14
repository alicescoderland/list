import paginationStyle from "../Pagination/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <section className={paginationStyle.container}>
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAngleLeft} />
        <span>PREV</span>
      </button>
      <span className={paginationStyle.pageNumbers}>
        PAGE {currentPage} OF {totalPages}
      </span>

      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        <span>NEXT</span>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </section>
  );
};

export default Pagination;
