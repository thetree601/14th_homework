# 문제 #001: 수정 모드에서 이미지가 사라지는 문제

## 발생 일시
2025년 1월 (정확한 날짜는 프로젝트 히스토리 참조)

## 문제 상황

### 증상
- 수정 모드에서 이미지를 새로 등록하지 않고 "수정하기" 버튼을 누르면
- 기존 이미지가 사라지고 데이터베이스에서도 이미지 주소가 삭제됨
- 다른 필드(제목, 내용 등)는 정상적으로 수정됨

### 발생 위치
- **URL**: `/secrets/[secretId]` (비밀 수정 페이지)
- **컴포넌트**: `secrets-form` 컴포넌트
- **관련 파일**:
  - `src/components/secrets-form/index.tsx`
  - `src/components/secrets-list/mutations.ts` (updateSecret 함수)

## 원인 분석

### 근본 원인
1. **폼 제출 시 이미지 값 처리 문제**
   - `watch("image")` 값이 `null`로 나옴
   - `handleFormSubmit`에서 `processedData.image = null`로 설정됨
   - `updateSecret` 함수에서 `formData.image === null`이면 `imageUrl = null`로 설정되어 이미지 삭제

2. **상태 동기화 문제**
   - 수정 모드에서 기존 이미지가 있지만 폼의 `image` 필드가 초기화되지 않음
   - `watch("image")`가 `null` 또는 `undefined`로 나옴

### 데이터 흐름
```
1. 수정 모드 진입
   └─> existingImageUrl이 있음 (기존 이미지 URL)
   
2. 폼 초기화
   └─> initialData로 폼 필드 초기화
   └─> 하지만 image 필드는 FileList가 아니므로 초기화되지 않음
   
3. 사용자가 수정하기 버튼 클릭
   └─> handleFormSubmit 호출
   └─> watch("image") === null
   └─> processedData.image = null (또는 빈 FileList)
   
4. updateSecret 호출
   └─> formData.image === null
   └─> imageUrl = null 설정
   └─> 데이터베이스에서 이미지 삭제 ❌
```

## 해결 방법

### 수정 내용

**파일**: `src/components/secrets-form/index.tsx`

**위치**: `handleFormSubmit` 함수 내부 (219-231줄)

**변경 전**:
```typescript
if (processedData.image && processedData.image instanceof FileList && processedData.image.length === 0) {
  processedData.image = null;
  console.log('빈 FileList를 null로 변환');
}
```

**변경 후**:
```typescript
// 🔥 중요: 수정 모드에서 이미지를 선택하지 않았고 기존 이미지가 있으면 undefined로 설정
// (undefined면 updateSecret에서 기존 이미지를 유지함)
if (mode === "edit" && 
    (!processedData.image || (processedData.image instanceof FileList && processedData.image.length === 0)) &&
    (currentImageValue === null || currentImageValue === undefined) &&
    propExistingImageUrl) {
  console.log('✅ 수정 모드: 이미지 변경 없음, 기존 이미지 유지 (undefined 설정)');
  processedData.image = undefined; // undefined = 변경 없음
} else if (processedData.image && processedData.image instanceof FileList && processedData.image.length === 0) {
  // 빈 FileList를 null로 변환 (명시적으로 이미지를 제거한 경우)
  processedData.image = null;
  console.log('빈 FileList를 null로 변환 (이미지 제거)');
}
```

### 핵심 로직
- **수정 모드** + **이미지 선택 안 함** + **기존 이미지 있음** → `undefined` 설정
- `undefined`는 "변경 없음"을 의미하며, `updateSecret`에서 기존 이미지를 유지함
- `null`은 "명시적으로 삭제"를 의미하며, 이미지를 제거함

## 예방 방법

### 1. 문제 발생 위치 정확히 파악
- ✅ URL 경로 확인 (`/secrets/[id]` vs `/boards/[id]`)
- ✅ 브라우저 콘솔 로그 확인
- ✅ 관련 컴포넌트 파일 확인

### 2. 비슷한 컴포넌트와 혼동하지 않기
- ⚠️ `boards-write` (게시판 글 수정) vs `secrets-form` (비밀 수정)
- ⚠️ `images` (배열) vs `image` (단일 파일)
- ⚠️ GraphQL mutation vs Supabase mutation

### 3. 데이터 흐름 추적
- 폼 제출 → 처리 함수 → API 호출 → 데이터베이스 업데이트
- 각 단계에서 이미지 값이 어떻게 변하는지 확인

### 4. 상태 값 의미 명확히 하기
- `undefined`: 변경 없음 (기존 값 유지)
- `null`: 명시적으로 삭제
- `FileList`: 새 이미지 업로드

## 관련 파일

- `src/components/secrets-form/index.tsx` - 폼 컴포넌트
- `src/components/secrets-list/mutations.ts` - updateSecret 함수
- `src/components/secrets-edit/index.tsx` - 수정 페이지 컴포넌트

## 참고 사항

- 이 문제는 `boards-write` 컴포넌트와 혼동되어 잘못된 파일을 수정하려고 했던 경험이 있음
- 프로젝트가 복잡할수록 정확한 위치 파악이 중요함
- 비슷한 기능이라도 구현 방식이 다를 수 있으므로 각각 확인 필요

## 체크리스트 (다음에 유사한 문제 발생 시)

- [ ] 문제가 발생하는 정확한 URL 경로 확인
- [ ] 브라우저 콘솔 로그 확인
- [ ] 관련 컴포넌트 파일 확인
- [ ] 데이터 흐름 추적 (폼 → 처리 → API → DB)
- [ ] 상태 값의 의미 확인 (undefined vs null vs FileList)
- [ ] 비슷한 컴포넌트와 혼동하지 않았는지 확인

