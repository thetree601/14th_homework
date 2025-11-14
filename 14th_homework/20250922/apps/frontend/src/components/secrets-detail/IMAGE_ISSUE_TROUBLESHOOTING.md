# 이미지 표시 문제 해결 가이드

## 문제 상황
- 메인 페이지에서는 이미지가 정상적으로 표시됨
- 상세 페이지에서는 이미지가 표시되지 않음 (`null`로 표시)
- 데이터베이스에는 이미지 URL이 정상적으로 저장되어 있음

## 원인 분석

### 1. 필드명 불일치 문제 (주요 원인)
**문제:**
- 데이터베이스 컬럼명: `img`
- 코드에서 사용하던 필드명: `imageSrc`
- 결과: 필드명이 일치하지 않아 값이 전달되지 않음

**증상:**
```typescript
// 데이터베이스에서 가져온 데이터
{
  img: "https://...", // 실제 값이 있음
  ...
}

// 코드에서 사용하던 방식
{
  imageSrc: null, // 필드명이 달라서 값이 전달되지 않음
  ...
}
```

### 2. Next.js 서버 컴포넌트 캐싱 문제
**문제:**
- Next.js 서버 컴포넌트는 기본적으로 캐싱됨
- 코드를 수정해도 이전에 렌더링된 결과가 캐시되어 표시됨
- 개발 중에는 코드 변경 후에도 이전 데이터가 보일 수 있음

**증상:**
- 코드를 수정해도 브라우저에 변경사항이 반영되지 않음
- 개발 서버 재시작 또는 캐시 무효화 후에야 변경사항이 반영됨

### 3. 타입 캐스팅 문제
**문제:**
- `data as SecretRow`로 타입 캐스팅 후 `secret.img` 사용 시 값이 전달되지 않음
- 타입 캐스팅 과정에서 값이 손실될 수 있음

## 해결 방법

### 1. 필드명을 데이터베이스 컬럼명과 일치시키기

**변경 전:**
```typescript
// queries.ts
const result = {
  id: secret.id,
  title: secret.title,
  imageSrc: secret.img, // ❌ 필드명 불일치
  ...
};

// SecretDetail.tsx
export type SecretDetailData = {
  imageSrc: string | null; // ❌ 필드명 불일치
  ...
};

// SecretContent.tsx
export default function SecretContent({
  imageSrc, // ❌ prop 이름 불일치
  ...
}: {
  imageSrc: string | null | undefined;
  ...
})
```

**변경 후:**
```typescript
// queries.ts
const result = {
  id: rawData.id,
  title: rawData.title,
  img: rawData.img, // ✅ 데이터베이스 컬럼명과 일치
  ...
};

// SecretDetail.tsx
export type SecretDetailData = {
  img: string | null; // ✅ 데이터베이스 컬럼명과 일치
  ...
};

// SecretContent.tsx
export default function SecretContent({
  img, // ✅ prop 이름을 데이터베이스 컬럼명과 일치
  ...
}: {
  img: string | null | undefined;
  ...
})
```

### 2. Next.js 캐시 설정 추가

**해결 방법:**
```typescript
// app/secrets/[secretId]/page.tsx
// 캐시를 비활성화하여 항상 최신 데이터를 가져오도록 설정
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

**설명:**
- `dynamic = 'force-dynamic'`: 동적 렌더링 강제 (캐싱 비활성화)
- `revalidate = 0`: 캐시 재검증 비활성화 (항상 최신 데이터 사용)

### 3. 타입 캐스팅 없이 직접 값 가져오기

**변경 전:**
```typescript
const secret = data as SecretRow;
const result = {
  img: secret.img, // ❌ 타입 캐스팅 후 사용
  ...
};
```

**변경 후:**
```typescript
const rawData = data as any;
const result = {
  img: rawData.img, // ✅ 타입 캐스팅 없이 직접 사용
  ...
};
```

## 최종 해결 코드

### queries.ts
```typescript
export async function fetchSecretById(secretId: string) {
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('id', secretId)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  // 타입 캐스팅 없이 직접 data에서 값 가져오기
  const rawData = data as any;
  const result = {
    id: rawData.id,
    title: rawData.title,
    description: rawData.description || rawData.desc || '',
    img: rawData.img, // ✅ 데이터베이스 컬럼명 img를 그대로 사용
    tags: rawData.tags || [],
    intro: rawData.intro || '',
    price: rawData.price,
    address: rawData.address || '',
    postalCode: rawData.postal_code || '',
    addressDetail: rawData.address_detail || '',
    latitude: rawData.latitude?.toString() || '',
    longitude: rawData.longitude?.toString() || '',
  };
  
  return result;
}
```

### page.tsx
```typescript
// 캐시를 비활성화하여 항상 최신 데이터를 가져오도록 설정
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SecretDetailPage({ params }: SecretDetailPageProps) {
  const secretData = await fetchSecretById(params.secretId);
  
  if (!secretData) {
    notFound();
  }
  
  return <SecretDetail data={secretData} />;
}
```

### SecretDetail.tsx
```typescript
export type SecretDetailData = {
  id: string;
  title: string;
  description: string;
  img: string | null; // ✅ 데이터베이스 컬럼명과 일치
  tags: string[];
  intro: string;
  price: number;
  // ...
};

export default function SecretDetail({ data }: { data: SecretDetailData }) {
  return (
    <div className={styles.container}>
      {/* ... */}
      <SecretContent img={data.img} intro={data.intro} />
      {/* ... */}
    </div>
  );
}
```

### SecretContent.tsx
```typescript
export default function SecretContent({
  img,
  intro,
}: {
  img: string | null | undefined; // ✅ 데이터베이스 컬럼명과 일치
  intro: string;
}) {
  const isValidImg = img && typeof img === 'string' && img.trim() !== '';
  
  return (
    <section className={styles.content}>
      {isValidImg && (
        <div className={styles.imageWrap}>
          <img 
            src={img} 
            alt="비밀 이미지" 
            className={styles.image}
            onError={(e) => {
              console.error('이미지 로드 실패:', img);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      {/* ... */}
    </section>
  );
}
```

## 교훈 및 주의사항

### 1. 필드명 일관성 유지
- **중요**: 데이터베이스 컬럼명과 코드의 필드명을 항상 일치시켜야 함
- 메인 페이지와 상세 페이지에서 동일한 필드명 사용
- 필드명 변경 시 모든 관련 코드를 함께 수정

### 2. Next.js 캐싱 이해
- 서버 컴포넌트는 기본적으로 캐싱됨
- 개발 중에는 코드 변경 후에도 이전 결과가 보일 수 있음
- 개발 서버 재시작 또는 브라우저 캐시 클리어로 해결 가능
- 프로덕션에서는 `revalidate` 값을 적절히 설정하여 성능과 최신성의 균형 유지

### 3. 타입 캐스팅 주의
- 타입 캐스팅은 타입 체크만 수행하며 실제 값 변환은 하지 않음
- 하지만 타입 캐스팅 과정에서 값이 손실될 수 있으므로 주의 필요
- 가능하면 타입 캐스팅 없이 직접 값에 접근하는 것이 안전함

### 4. 디버깅 팁
- 브라우저 콘솔과 서버 콘솔(터미널) 모두 확인
- 데이터베이스에서 실제로 가져온 값 확인
- 필드명이 정확히 일치하는지 확인
- 캐시 문제인지 확인 (개발 서버 재시작)

## 참고 파일
- `components/secrets-list/queries.ts` - 데이터 조회 함수
- `app/secrets/[secretId]/page.tsx` - 상세 페이지 서버 컴포넌트
- `components/secrets-detail/SecretDetail.tsx` - 상세 컴포넌트
- `components/secrets-detail/SecretContent.tsx` - 이미지 표시 컴포넌트

