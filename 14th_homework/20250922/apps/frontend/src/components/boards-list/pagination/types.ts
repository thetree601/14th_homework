export interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onChangePage: (page: number) => void;
  }
  