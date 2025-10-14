"use client";

import Image from "next/image";
import React from "react";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";
import YouTube from "react-youtube";
import { useBoardsDetail } from "./hook";
import type { BoardsDetailProps } from "./types";
import styles from "./styles.module.css";

// 유튜브 URL에서 비디오 ID 추출 함수
const extractYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

// 이미지 URL을 절대 URL로 변환하는 함수
const getImageUrl = (imagePath: string): string => {
  // 이미 절대 URL인 경우 그대로 반환
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // storage.googleapis.com 경로인 경우 그대로 반환
  if (imagePath.startsWith('codecamp-file-storage/')) {
    return `https://storage.googleapis.com/${imagePath}`;
  }
  
  // 상대 경로인 경우 GraphQL 서버의 기본 URL과 결합
  const baseUrl = 'https://main-practice.codebootcamp.co.kr';
  return `${baseUrl}/${imagePath}`;
};

export default function BoardsDetail(props: BoardsDetailProps) {
  const { data, loading, error, onClickMoveToEdit, onClickMoveToList, onClickLike, onClickDislike } = useBoardsDetail(props);
  const pathname = usePathname();
  const pageUrl = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : pathname;

  if (loading) {
    return <div className="text-center mt-20">로딩 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">에러 발생: {error.message}</div>;
  }

  const boardData = data?.fetchBoard;

  if (!boardData) {
    return <div className="text-center mt-20">게시글을 찾을 수 없습니다.</div>;
  }

  const formattedDate = new Date(boardData.createdAt)
    .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/\./g, ".")
    .trim();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{boardData.title}</h1>
        <div className={styles.meta}>
          <Image src="/images/profile_img.png" alt="프로필" width={24} height={24} className={styles.avatar} />
          <span className={styles.writer}>{boardData.writer}</span>
          <span>{formattedDate}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
            <a href={pageUrl || "#"} target="_blank" rel="noreferrer" aria-label="링크 열기">
              <Image src="/images/link.png" alt="링크" width={18} height={18} />
            </a>
            <Tooltip 
              title={
                boardData.boardAddress?.address || boardData.boardAddress?.zipcode ? (
                  <div>
                    {boardData.boardAddress?.zipcode && <div>우편번호: {boardData.boardAddress?.zipcode}</div>}
                    {boardData.boardAddress?.address && <div>주소: {boardData.boardAddress?.address}</div>}
                    {boardData.boardAddress?.addressDetail && <div>상세주소: {boardData.boardAddress?.addressDetail}</div>}
                  </div>
                ) : '주소 정보가 없습니다'
              }
              arrow
              placement="bottom"
            >
              <span>
                <Image src="/images/location.png" alt="주소" width={18} height={18} style={{ cursor: "pointer" }} />
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {boardData.images && boardData.images.length > 0 && (
          <div className={styles.imagesContainer}>
            {boardData.images.map((image: string, index: number) => (
              <Image 
                key={index}
                src={getImageUrl(image)} 
                alt={`게시글 이미지 ${index + 1}`} 
                width={384} 
                height={216} 
                className={styles.beachImage}
                style={{ marginBottom: index < boardData.images.length - 1 ? '16px' : '0' }}
              />
            ))}
          </div>
        )}
        <div className={styles.contents}>{boardData.contents}</div>
      </div>

      {boardData.youtubeUrl && (
        <div className={styles.youtubeSection}>
          <h3 className={styles.youtubeTitle}>관련 영상</h3>
          <div className={styles.youtubeContainer}>
            <YouTube
              videoId={extractYouTubeVideoId(boardData.youtubeUrl)}
              opts={{
                width: '100%',
                height: '400',
                playerVars: {
                  autoplay: 0,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
              className={styles.youtubePlayer}
            />
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.likes}>
          <div className={styles.likeItem} onClick={onClickLike} role="button" aria-label="좋아요">
            <ThumbUp sx={{ color: '#1976d2', fontSize: 24 }} />
            <span>{boardData.likeCount}</span>
          </div>
          <div className={styles.likeItem} onClick={onClickDislike} role="button" aria-label="싫어요">
            <ThumbDown sx={{ color: '#d32f2f', fontSize: 24 }} />
            <span>{boardData.dislikeCount}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={onClickMoveToList}>
            <Image src="/images/list.png" alt="목록" width={20} height={20} className={styles.actionIcon} />
            목록으로
          </button>
          <button className={styles.actionButton} onClick={onClickMoveToEdit}>
            <Image src="/images/edit_pen.png" alt="수정" width={20} height={20} className={styles.actionIcon} />
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}