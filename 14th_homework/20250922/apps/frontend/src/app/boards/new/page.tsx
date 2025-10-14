"use client";

import BoardsWrite from "@/components/boards-write/";
import React from "react";
import { withAuth, WithAuthProps } from "@/commons/hoc";

/**
 * 게시글 등록 페이지 컴포넌트
 * HOC를 통해 인증 상태를 자동으로 관리받음
 */
function BoardsNewPageComponent({ isAuthenticated, isLoading }: WithAuthProps) {
  // 로딩 중이거나 인증되지 않은 경우는 HOC에서 처리되므로 여기서는 항상 인증된 상태
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        로딩 중...
      </div>
    );
  }

  // 인증된 사용자만 게시글 작성 컴포넌트 표시
  // isAuthenticated는 HOC에서 보장되므로 여기서는 항상 true
  console.log('인증 상태:', isAuthenticated); // 디버깅용
  
  return <BoardsWrite isEdit={false} />;
}

/**
 * 게시글 등록 페이지
 * 로그인한 사용자만 접근 가능
 * withAuth HOC를 통해 인증 상태를 자동으로 관리
 */
const BoardsNewPage = withAuth(BoardsNewPageComponent, {
  redirectTo: '/auth/login',
  requireAuth: true
});

export default BoardsNewPage;
