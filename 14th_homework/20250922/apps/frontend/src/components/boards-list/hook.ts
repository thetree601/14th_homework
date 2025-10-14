import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { FETCH_BOARDS_DOCUMENT, FETCH_BOARDS_COUNT_DOCUMENT } from "./queries";

export interface UseBoardsListProps {
  initialPage?: number;
  initialSearch?: string;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export interface UseBoardsListReturn {
  // 상태
  currentPage: number;
  searchKeyword: string;
  startDate: Date | null;
  endDate: Date | null;
  
  // 데이터
  boards: any[];
  totalBoardCount: number;
  totalPage: number;
  
  // 로딩/에러 상태
  boardsLoading: boolean;
  countLoading: boolean;
  boardsError: any;
  countError: any;
  
  // 액션
  setCurrentPage: (page: number) => void;
  handleSearch: (keyword: string, start: Date | null, end: Date | null) => void;
  handleReset: () => void;
  onChangePage: (page: number) => void;
  refetch: () => void;
}

export const useBoardsList = ({
  initialPage = 1,
  initialSearch = "",
  initialStartDate = null,
  initialEndDate = null,
}: UseBoardsListProps = {}): UseBoardsListReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchKeyword, setSearchKeyword] = useState(initialSearch);
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const {
    data: boardsData,
    loading: boardsLoading,
    error: boardsError,
    refetch: boardsRefetch,
  } = useQuery(FETCH_BOARDS_DOCUMENT, {
    variables: { page: currentPage, search: searchKeyword, startDate: startDate, endDate: endDate },
  });

  const {
    data: countData,
    loading: countLoading,
    error: countError,
    refetch: countRefetch,
  } = useQuery(FETCH_BOARDS_COUNT_DOCUMENT, {
    variables: { search: searchKeyword, startDate: startDate, endDate: endDate },
  });

  useEffect(() => {
    boardsRefetch();
    countRefetch();
  }, [boardsRefetch, countRefetch]);

  const totalBoardCount = countData?.fetchBoardsCount || 0;
  const totalPage = Math.ceil(totalBoardCount / 10);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    boardsRefetch({ page, search: searchKeyword, startDate, endDate });
    
    // URL 업데이트 (브라우저 히스토리에 추가)
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', page.toString());
    router.push(`/boards?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (keyword: string, start: Date | null, end: Date | null) => {
    setSearchKeyword(keyword);
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    boardsRefetch({ page: 1, search: keyword, startDate: start, endDate: end });
    countRefetch({ search: keyword, startDate: start, endDate: end });
    
    // URL 업데이트 (검색 시 첫 페이지로)
    const params = new URLSearchParams();
    params.set('page', '1');
    if (keyword) params.set('search', keyword);
    if (start) params.set('startDate', start.toISOString());
    if (end) params.set('endDate', end.toISOString());
    router.push(`/boards?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setSearchKeyword("");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
    boardsRefetch({ page: 1, search: "", startDate: null, endDate: null });
    countRefetch({ search: "", startDate: null, endDate: null });
    
    // URL 업데이트 (리셋 시 첫 페이지로)
    router.push('/boards?page=1', { scroll: false });
  };

  const refetch = () => {
    boardsRefetch();
    countRefetch();
  };

  return {
    // 상태
    currentPage,
    searchKeyword,
    startDate,
    endDate,
    
    // 데이터
    boards: boardsData?.fetchBoards || [],
    totalBoardCount,
    totalPage,
    
    // 로딩/에러 상태
    boardsLoading,
    countLoading,
    boardsError,
    countError,
    
    // 액션
    setCurrentPage,
    handleSearch,
    handleReset,
    onChangePage,
    refetch,
  };
};
