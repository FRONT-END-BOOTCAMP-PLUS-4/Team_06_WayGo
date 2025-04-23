"use client";

import { useState } from "react";
import styles from "./pagination.module.scss";
import Image from "next/image";

interface PaginationProps {
  totalPages: number;
  currPage: number;
  onChangePage?: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currPage,
  onChangePage,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(currPage ?? 1);
  const visiblePages = 5;
  const groupStartPage =
    Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;

  const handleClick = (page: number) => {
    // 페이지 클릭 시
    if (onChangePage) {
      onChangePage(page);
    }
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // 보여줄 페이지 수
  const pages = Array.from(
    { length: visiblePages },
    (_, i) => groupStartPage + i
  ).filter((page) => page <= totalPages);

  const isLastPage = totalPages === currentPage;
  const isFirstPage = currentPage === 1;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={handlePrevPage}
        disabled={isFirstPage}
      >
        <Image
          src={"/icons/chevron-left-primary.svg"}
          alt="prev"
          width={20}
          height={20}
        />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={page === currentPage ? styles.active : ""}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrow}
        onClick={handleNextPage}
        disabled={isLastPage}
      >
        <Image
          src={"/icons/chevron-right-primary.svg"}
          alt="next"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default Pagination;
