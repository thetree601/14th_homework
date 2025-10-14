"use client";

import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { authManager } from "@/lib/auth";

// 게스트 전용 옵션 타입 정의
interface GuestOptions {
  redirectTo?: string; // 로그인된 사용자를 리다이렉트할 경로 (기본값: '/boards')
  loadingComponent?: React.ComponentType; // 로딩 중 표시할 컴포넌트
}

// HOC의 Props 타입 정의
interface WithGuestProps {
  isGuest: boolean;
  isLoading: boolean;
}

// 제네릭 타입이 적용된 게스트 전용 HOC 함수
function withGuest<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: GuestOptions = {}
) {
  const {
    redirectTo = '/boards',
    loadingComponent: LoadingComponent
  } = options;

  // HOC로 감싸진 컴포넌트의 타입 정의
  type HOCComponentProps = P & WithGuestProps;

  const GuestComponent: React.FC<HOCComponentProps> = (props) => {
    const router = useRouter();
    const [isGuest, setIsGuest] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkGuest = () => {
        try {
          // authManager에서 토큰 초기화
          authManager.initializeToken();
          
          const isLoggedIn = authManager.isLoggedIn();
          
          if (isLoggedIn) {
            // 이미 로그인된 사용자는 메인 페이지로 리다이렉트
            router.push(redirectTo);
          } else {
            // 게스트 사용자 (로그인하지 않은 사용자)
            setIsGuest(true);
          }
        } catch (error) {
          console.error('게스트 상태 확인 실패:', error);
          // 에러가 발생해도 게스트로 처리
          setIsGuest(true);
        } finally {
          setIsLoading(false);
        }
      };

      checkGuest();
    }, [router, redirectTo]);

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
          페이지를 로드하는 중...
        </div>
      );
    }

    // 게스트 사용자만 컴포넌트 렌더링
    if (isGuest) {
      return <WrappedComponent {...(props as P)} isGuest={isGuest} isLoading={isLoading} />;
    }

    // 로그인된 사용자는 리다이렉트 중이므로 아무것도 렌더링하지 않음
    return null;
  };

  // 컴포넌트 이름 설정 (디버깅용)
  GuestComponent.displayName = `withGuest(${WrappedComponent.displayName || WrappedComponent.name})`;

  return GuestComponent;
}

export default withGuest;
export type { GuestOptions, WithGuestProps };
