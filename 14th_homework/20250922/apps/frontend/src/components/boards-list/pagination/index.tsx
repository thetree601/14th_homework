// src/components/boards-list/pagination/index.tsx

import React from "react";
import Pagination from "../../ui/Pagination";
import { PaginationProps } from "./types";

export default function PaginationWrapper({ currentPage, totalPage, onChangePage }: PaginationProps) {
  return (
    <Pagination 
      currentPage={currentPage}
      totalPage={totalPage}
      onChangePage={onChangePage}
    />
  );
}