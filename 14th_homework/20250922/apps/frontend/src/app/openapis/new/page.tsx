"use client";

import React from "react";
import OpenApiNew from "@/components/openapis-new";
import { withAuth, WithAuthProps } from "@/commons/hoc";

/**
 * OpenAPI 새 글 작성 페이지 컴포넌트
 * HOC를 통해 인증 상태를 자동으로 관리받음
 */
function OpenApiNewPageComponent({ isAuthenticated, isLoading }: WithAuthProps) {
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

  return <OpenApiNew />;
}

/**
 * OpenAPI 새 글 작성 페이지
 * 로그인한 사용자만 접근 가능
 * withAuth HOC를 통해 인증 상태를 자동으로 관리
 */
const OpenApiNewPage = withAuth(OpenApiNewPageComponent, {
  redirectTo: '/auth/login',
  requireAuth: true
});

export default OpenApiNewPage;