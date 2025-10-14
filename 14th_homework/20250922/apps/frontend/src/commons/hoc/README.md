# HOC (Higher-Order Component) 활용 가이드

이 프로젝트에서는 인증 상태 관리를 위한 HOC를 제공합니다.

## 제공되는 HOC

### 1. withAuth
로그인이 필요한 페이지에 사용하는 HOC입니다.

#### 사용법
```tsx
import { withAuth, WithAuthProps } from '@/commons/hoc';

// 기본 컴포넌트
function MyPageComponent({ isAuthenticated, isLoading }: WithAuthProps) {
  return <div>인증된 사용자만 볼 수 있는 내용</div>;
}

// HOC로 감싸기
const MyPage = withAuth(MyPageComponent, {
  redirectTo: '/auth/login', // 로그인하지 않은 경우 리다이렉트할 경로
  requireAuth: true, // 인증이 필요한지 여부 (기본값: true)
  loadingComponent: CustomLoadingComponent, // 선택적: 커스텀 로딩 컴포넌트
  fallbackComponent: CustomFallbackComponent // 선택적: 인증 실패 시 표시할 컴포넌트
});

export default MyPage;
```

#### 옵션
- `redirectTo`: 로그인하지 않은 사용자를 리다이렉트할 경로 (기본값: '/auth/login')
- `requireAuth`: 인증이 필요한지 여부 (기본값: true)
- `loadingComponent`: 로딩 중 표시할 커스텀 컴포넌트
- `fallbackComponent`: 인증 실패 시 표시할 커스텀 컴포넌트

### 2. withGuest
로그인하지 않은 사용자만 접근할 수 있는 페이지에 사용하는 HOC입니다.

#### 사용법
```tsx
import { withGuest, WithGuestProps } from '@/commons/hoc';

// 기본 컴포넌트
function LoginPageComponent({ isGuest, isLoading }: WithGuestProps) {
  return <div>로그인 페이지</div>;
}

// HOC로 감싸기
const LoginPage = withGuest(LoginPageComponent, {
  redirectTo: '/boards' // 이미 로그인된 사용자를 리다이렉트할 경로
});

export default LoginPage;
```

#### 옵션
- `redirectTo`: 이미 로그인된 사용자를 리다이렉트할 경로 (기본값: '/boards')
- `loadingComponent`: 로딩 중 표시할 커스텀 컴포넌트

## 제네릭 타입 지원

두 HOC 모두 제네릭 타입을 지원하여 타입 안전성을 보장합니다:

```tsx
// 원본 컴포넌트의 props 타입 정의
interface MyPageProps {
  title: string;
  content: string;
}

// HOC 적용 시 원본 props와 HOC props가 모두 타입 체크됨
function MyPageComponent({ title, content, isAuthenticated, isLoading }: MyPageProps & WithAuthProps) {
  return <div>{title}: {content}</div>;
}

const MyPage = withAuth(MyPageComponent);
```

## 실제 적용 예시

### 게시글 작성 페이지
```tsx
// src/app/boards/new/page.tsx
"use client";

import BoardsWrite from "@/components/boards-write/";
import React from "react";
import { withAuth, WithAuthProps } from "@/commons/hoc";

function BoardsNewPageComponent({ isAuthenticated, isLoading }: WithAuthProps) {
  return <BoardsWrite isEdit={false} />;
}

const BoardsNewPage = withAuth(BoardsNewPageComponent, {
  redirectTo: '/auth/login',
  requireAuth: true
});

export default BoardsNewPage;
```

### 로그인 페이지
```tsx
// src/app/auth/login/page.tsx
"use client";

import LoginPage from '@/components/auth/login/LoginPage';
import { withGuest, WithGuestProps } from '@/commons/hoc';

function LoginPageComponent({ isGuest, isLoading }: WithGuestProps) {
  return <LoginPage />;
}

const Login = withGuest(LoginPageComponent, {
  redirectTo: '/boards'
});

export default Login;
```

## 장점

1. **코드 재사용성**: 인증 로직을 여러 페이지에서 재사용할 수 있습니다.
2. **타입 안전성**: TypeScript 제네릭을 통해 타입 안전성을 보장합니다.
3. **관심사 분리**: 인증 로직과 비즈니스 로직을 분리할 수 있습니다.
4. **유지보수성**: 인증 로직 변경 시 HOC만 수정하면 됩니다.
5. **일관성**: 모든 페이지에서 동일한 인증 처리 방식을 사용합니다.
