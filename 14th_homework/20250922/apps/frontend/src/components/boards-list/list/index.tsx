"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { BoardsListProps } from "./types";

// 검색어 강조 표시 함수
const highlightSearchKeyword = (text: string, keyword: string) => {
  if (!keyword.trim()) return text;
  
  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} style={{ color: 'red', fontWeight: 'bold' }}>
        {part}
      </span>
    ) : part
  );
};

export default function BoardsList({ boards, onClickDelete, onClickRow, searchKeyword }: BoardsListProps) {
  if (!boards || boards.length === 0) {
    return <div className="text-center mt-20">게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>번호</th>
                <th className={styles.th}>제목</th>
                <th className={styles.th}>작성자</th>
                <th className={styles.th}>날짜</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {boards.map((board, index) => (
                <tr key={board._id} className={styles.tr} onClick={() => onClickRow(board._id)}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>
                    {highlightSearchKeyword(board.title, searchKeyword || "")}
                  </td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>{board.writer}</td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>
                    {new Date(board.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className={`${styles.td} ${styles.deleteCell}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDelete(board._id);
                      }}
                      className={styles.deleteButton}
                    >
                      <Image src="/images/delete.png" alt="삭제" width={20} height={20} className={styles.deleteIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
