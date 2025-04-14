"use client";
import React from "react";
import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalContents: number;
  paginate: (pageNumber: number) => void;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalContents,
  paginate,
}): PaginationProps => {
  return <></>;
};

export default Pagination;
