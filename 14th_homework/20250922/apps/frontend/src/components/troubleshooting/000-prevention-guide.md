# 문제 예방 가이드 (Prevention Guide)

## 프로젝트 구조 파악

### 주요 컴포넌트 구분

#### 1. 게시판 관련 (`boards-*`)
- **경로**: `/boards/*`
- **컴포넌트**: `boards-write`, `boards-detail`, `boards-list`
- **특징**: 
  - GraphQL 사용
  - `images` (배열, 복수형)
  - Apollo Client 사용

#### 2. 비밀 관련 (`secrets-*`)
- **경로**: `/secrets/*`
- **컴포넌트**: `secrets-form`, `secrets-detail`, `secrets-list`
- **특징**:
  - Supabase 사용
  - `image` (단일 파일, 단수형)
  - React Query 사용 가능

## 문제 해결 전 체크리스트

### 1단계: 문제 위치 정확히 파악

```
✅ URL 경로 확인
   - /boards/[id] → boards-write 컴포넌트
   - /secrets/[id] → secrets-form 컴포넌트
   
✅ 브라우저 콘솔 확인
   - 에러 메시지 확인
   - 로그 메시지 확인
   - 네트워크 요청 확인
   
✅ 관련 파일 찾기
   - 컴포넌트 파일
   - Hook 파일
   - Mutation/Query 파일
```

### 2단계: 데이터 흐름 추적

```
1. 사용자 액션
   └─> 폼 제출, 버튼 클릭 등
   
2. 컴포넌트 처리
   └─> handleSubmit, onClick 등
   
3. 데이터 변환
   └─> 폼 데이터 → API 데이터
   
4. API 호출
   └─> GraphQL mutation 또는 Supabase update
   
5. 데이터베이스 업데이트
   └─> 실제 데이터 변경
```

### 3단계: 상태 값 의미 확인

| 값 | 의미 | 사용 예시 |
|---|---|---|
| `undefined` | 변경 없음 (기존 값 유지) | 수정 모드에서 필드를 건드리지 않음 |
| `null` | 명시적으로 삭제 | 사용자가 삭제 버튼 클릭 |
| `""` (빈 문자열) | 빈 값 | 새로 작성 시 초기값 |
| `FileList` | 새 파일 업로드 | 파일 선택 |
| `string[]` | 배열 값 | 이미지 배열 등 |

## 자주 발생하는 실수

### 1. 비슷한 컴포넌트 혼동
- ❌ `boards-write`와 `secrets-form` 혼동
- ✅ URL 경로로 정확히 구분

### 2. 필드명 혼동
- ❌ `images` (복수) vs `image` (단수)
- ✅ 각 컴포넌트의 스키마 확인

### 3. API 방식 혼동
- ❌ GraphQL과 Supabase 혼동
- ✅ 각 컴포넌트가 사용하는 API 확인

### 4. 상태 값 의미 혼동
- ❌ `null`과 `undefined` 혼동
- ✅ 각 값의 의미 명확히 이해

## 문제 해결 시 주의사항

### DO ✅
- 문제가 발생하는 정확한 위치 먼저 확인
- 브라우저 콘솔 로그 확인
- 데이터 흐름 전체 추적
- 최소한의 변경으로 해결
- 변경 후 다른 기능 영향 확인

### DON'T ❌
- 비슷한 컴포넌트 추측으로 수정
- 로그 확인 없이 바로 수정
- 전체 로직 변경
- 테스트 없이 배포

## 디버깅 팁

### 1. 콘솔 로그 활용
```typescript
console.log('=== 단계별 확인 ===');
console.log('1. 초기 상태:', state);
console.log('2. 처리 후:', processed);
console.log('3. API 전송:', apiData);
```

### 2. 조건부 로그
```typescript
if (mode === "edit" && !image && existingImage) {
  console.log('⚠️ 경고: 수정 모드에서 이미지가 없습니다!');
}
```

### 3. 타입 확인
```typescript
console.log('타입:', typeof value);
console.log('배열 여부:', Array.isArray(value));
console.log('인스턴스:', value instanceof FileList);
```

## 문제 해결 후

1. **문서화**: `troubleshooting/` 폴더에 문제와 해결 과정 기록
2. **검증**: 다른 유사한 컴포넌트에도 같은 문제가 있는지 확인
3. **예방**: 같은 문제가 재발하지 않도록 가이드 업데이트

## 관련 문서

- [문제 #001: 이미지 수정 시 사라지는 문제](./001-image-disappears-on-edit.md)
- [README.md](./README.md)

