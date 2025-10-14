import React from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { PaginationProps } from "../../types";

export default function Pagination({ currentPage, totalPage, onChangePage }: PaginationProps) {
  // 한 번에 보여줄 페이지 버튼의 개수를 5개로 설정
  const pageRange = 5; 
  
  // 현재 페이지가 속한 페이지 그룹의 시작 페이지 번호를 계산
  const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
  
  // 현재 페이지 그룹의 마지막 페이지 번호를 계산 (총 페이지 수를 넘지 않도록)
  const endPage = Math.min(startPage + pageRange - 1, totalPage);

  // 보여줄 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const onClickPrev = () => {
    if (currentPage > 1) {
      const prevGroupStart = startPage - pageRange; // 이전 그룹의 첫 페이지
      onChangePage(prevGroupStart);
    }
  };
  
  const onClickNext = () => {
    if (currentPage < totalPage) {
      const nextGroupStart = startPage + pageRange; // 다음 그룹의 첫 페이지
      onChangePage(nextGroupStart > totalPage ? totalPage : nextGroupStart);
    }
  };

  const onClickPage = (page: number) => () => {
    onChangePage(page);
  };

  return (
    <div className="paginationContainer">
      <button
        onClick={onClickPrev}
        disabled={currentPage === 1}
        className="paginationButton"
      >
        <ArrowLeft sx={{ fontSize: 18 }} />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={onClickPage(page)}
          className={`pageNumber ${currentPage === page ? "activePage" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={onClickNext}
        disabled={currentPage === totalPage}
        className="paginationButton"
      >
        <ArrowRight sx={{ fontSize: 18 }} />
      </button>
    </div>
  );
}
