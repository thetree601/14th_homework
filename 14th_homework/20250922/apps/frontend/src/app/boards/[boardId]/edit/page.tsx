"use client";

import { useParams } from "next/navigation";
import BoardsWrite from "@/components/boards-write";
import { withAuth, WithAuthProps } from "@/commons/hoc";

/**
 * 게시글 수정 페이지 컴포넌트
 * HOC를 통해 인증 상태를 자동으로 관리받음
 */
function BoardEditPageComponent({ isAuthenticated, isLoading }: WithAuthProps) {
  const { boardId } = useParams() as { boardId: string };

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

  // 인증된 사용자만 게시글 수정 컴포넌트 표시
  // isAuthenticated는 HOC에서 보장되므로 여기서는 항상 true
  console.log('게시글 수정 - 인증 상태:', isAuthenticated); // 디버깅용
  
  return <BoardsWrite isEdit={true} boardId={boardId} />;
}

/**
 * 게시글 수정 페이지
 * 로그인한 사용자만 접근 가능
 * withAuth HOC를 통해 인증 상태를 자동으로 관리
 */
const BoardEditPage = withAuth(BoardEditPageComponent, {
  redirectTo: '/auth/login',
  requireAuth: true
});

export default BoardEditPage;