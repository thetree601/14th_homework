# @triptalk/ui-components

Triptalk 프로젝트의 공통 UI 컴포넌트 라이브러리입니다.

## 설치

```bash
pnpm add @triptalk/ui-components
```

## 사용법

```tsx
import { Navigation, Banner, Pagination } from '@triptalk/ui-components';

function App() {
  return (
    <div>
      <Navigation />
      <Banner />
      <Pagination 
        currentPage={1} 
        totalPage={10} 
        onChangePage={(page) => console.log(page)} 
      />
    </div>
  );
}
```

## 컴포넌트 목록

- **Navigation**: 네비게이션 바 컴포넌트
- **Banner**: 배너 슬라이더 컴포넌트  
- **Pagination**: 페이지네이션 컴포넌트
- **Loading**: 로딩 컴포넌트
- **Error**: 에러 컴포넌트

## 개발

```bash
# 개발 모드
pnpm dev

# 빌드
pnpm build

# 타입 체크
pnpm type-check
```
