"use client";

import LoginPage from '@/components/auth/login/LoginPage';
import { withGuest, WithGuestProps } from '@/commons/hoc';

/**
 * 로그인 페이지 컴포넌트
 * HOC를 통해 게스트 상태를 자동으로 관리받음
 */
function LoginPageComponent({ isGuest, isLoading }: WithGuestProps) {
  // 로딩 중이거나 이미 로그인된 사용자는 HOC에서 처리되므로 여기서는 항상 게스트 상태
  if (isLoading) {
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

  return <LoginPage />;
}

/**
 * 로그인 페이지
 * 로그인하지 않은 사용자만 접근 가능
 * withGuest HOC를 통해 게스트 상태를 자동으로 관리
 */
const Login = withGuest(LoginPageComponent, {
  redirectTo: '/boards'
});

export default Login;
