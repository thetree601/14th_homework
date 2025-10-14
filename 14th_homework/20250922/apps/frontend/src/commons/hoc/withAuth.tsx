"use client";

import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { authManager } from "@/lib/auth";

// 인증 옵션 타입 정의
interface AuthOptions {
  redirectTo?: string; // 리다이렉트할 경로 (기본값: '/auth/login')
  loadingComponent?: React.ComponentType; // 로딩 중 표시할 컴포넌트
  fallbackComponent?: React.ComponentType; // 인증 실패 시 표시할 컴포넌트
  requireAuth?: boolean; // 인증이 필요한지 여부 (기본값: true)
}

// HOC의 Props 타입 정의
interface WithAuthProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 제네릭 타입이 적용된 HOC 함수
function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: AuthOptions = {}
) {
  const {
    redirectTo = '/auth/login',
    loadingComponent: LoadingComponent,
    fallbackComponent: FallbackComponent,
    requireAuth = true
  } = options;

  // HOC로 감싸진 컴포넌트의 타입 정의
  type HOCComponentProps = P & WithAuthProps;

  const AuthenticatedComponent: React.FC<HOCComponentProps> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        try {
          // authManager에서 토큰 초기화
          authManager.initializeToken();
          
          const isLoggedIn = authManager.isLoggedIn();
          
          if (requireAuth) {
            // 인증이 필요한 경우
            if (isLoggedIn) {
              setIsAuthenticated(true);
            } else {
              // 로그인하지 않은 경우 리다이렉트
              router.push(redirectTo);
            }
          } else {
            // 인증이 필요하지 않은 경우 (예: 로그인 페이지)
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('인증 확인 실패:', error);
          if (requireAuth) {
            router.push(redirectTo);
          }
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router, redirectTo, requireAuth]);

    // 로딩 중일 때
    if (isLoading) {
      if (LoadingComponent) {
        return <LoadingComponent />;
      }
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px'
        }}>
          로그인 상태를 확인하는 중...
        </div>
      );
    }

    // 인증이 필요한데 인증되지 않은 경우
    if (requireAuth && !isAuthenticated) {
      if (FallbackComponent) {
        return <FallbackComponent />;
      }
      return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
    }

    // 인증된 사용자 또는 인증이 필요하지 않은 경우
    return <WrappedComponent {...(props as P)} isAuthenticated={isAuthenticated} isLoading={isLoading} />;
  };

  // 컴포넌트 이름 설정 (디버깅용)
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
}

export default withAuth;
export type { AuthOptions, WithAuthProps };
