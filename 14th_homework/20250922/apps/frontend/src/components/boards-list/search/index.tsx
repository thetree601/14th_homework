"use client";

import React, { useState, useMemo } from "react";
import { DatePicker, Input } from "antd";
import { debounce } from "lodash";
import type { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { authManager } from "@/lib/auth";
import styles from "./styles.module.css";
import { SearchProps } from "./types";

const { RangePicker } = DatePicker;

export default function Search({ onSearch, onReset }: SearchProps) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  // 디바운싱된 검색 함수 (0.5초 지연)
  const debouncedSearch = useMemo(
    () => debounce((keyword: string, startDate: Date | null, endDate: Date | null) => {
      onSearch(keyword, startDate, endDate);
    }, 500),
    [onSearch]
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
    
    // 디바운싱된 검색 실행
    const startDate = dateRange?.[0]?.toDate() || null;
    const endDate = dateRange?.[1]?.toDate() || null;
    debouncedSearch(value, startDate, endDate);
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
    
    // 날짜가 변경되면 즉시 검색 실행
    const startDate = dates?.[0]?.toDate() || null;
    const endDate = dates?.[1]?.toDate() || null;
    onSearch(searchKeyword, startDate, endDate);
  };

  const handleSearchClick = () => {
    const startDate = dateRange?.[0]?.toDate() || null;
    const endDate = dateRange?.[1]?.toDate() || null;
    onSearch(searchKeyword, startDate, endDate);
  };

  const handleReset = () => {
    setSearchKeyword("");
    setDateRange(null);
    onReset();
  };

  const handleNewPost = () => {
    try {
      // authManager에서 토큰 초기화
      authManager.initializeToken();
      
      if (authManager.isLoggedIn()) {
        // 로그인한 사용자는 게시글 등록 페이지로 이동
        router.push('/boards/new');
      } else {
        // 로그인하지 않은 사용자는 로그인 페이지로 이동
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('게시글 등록 페이지 접근 실패:', error);
      // 에러 발생 시 로그인 페이지로 이동
      router.push('/auth/login');
    }
  };

  return (
    <div className={styles.searchContainer}>
      {/* 날짜 검색 */}
      <RangePicker
        className={styles.datePicker}
        placeholder={["시작일", "종료일"]}
        value={dateRange}
        onChange={handleDateRangeChange}
        format="YYYY-MM-DD"
        allowClear
      />

      {/* 제목 검색 */}
      <Input
        className={styles.searchInput}
        placeholder="제목을 검색해주세요"
        value={searchKeyword}
        onChange={handleSearchInputChange}
        onPressEnter={handleSearchClick}
      />

      {/* 검색 버튼 */}
      <button
        className={styles.searchButton}
        onClick={handleSearchClick}
        disabled={!searchKeyword.trim() && !dateRange}
      >
        검색
      </button>

      {/* 초기화 버튼 */}
      <button
        className={styles.resetButton}
        onClick={handleReset}
      >
        초기화
      </button>

      {/* 게시글 등록 버튼 */}
      <button
        className={styles.newButton}
        onClick={handleNewPost}
      >
        게시글 등록
      </button>
    </div>
  );
}
