import React from "react";
import ReactPaginate from "react-paginate";
import { useMedia } from "react-use";
import { useSelector } from "react-redux";
import { filterType } from "@store/filter/filter.selector";

/* Style */
import styles from "./Pagination.module.scss";

const Pagination = ({ totalPages, currentPage, onChange }) => {
  const isMobile = useMedia("(max-width: 576px)", null);
  const type = useSelector(filterType);

  React.useEffect(() => {
    window.scrollTo(0, 150);
  }, []);

  return (
    <nav className={styles.root}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextLinkClassName={styles.next}
        nextClassName={styles.button}
        previousLabel="<"
        previousLinkClassName={styles.prev}
        previousClassName={styles.button}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={isMobile ? 1 : 3}
        containerClassName={styles.grid}
        pageClassName={styles.button}
        activeLinkClassName={styles.active}
        pageLinkClassName={styles.link}
        breakClassName={styles.button}
        breakLinkClassName={styles.break}
        disabledLinkClassName={styles.disabled}
        onPageChange={({ selected }) => onChange(selected + 1)}
        forcePage={currentPage - 1}
      />
    </nav>
  );
};

export default Pagination;
