# Supabase Storage 설정 가이드

이미지 업로드가 작동하지 않는 경우, Supabase Storage 설정을 확인하세요.

## 1. Storage Bucket 생성 및 설정

### Bucket 생성
1. Supabase 대시보드 접속
2. 좌측 메뉴에서 **Storage** 클릭
3. **New bucket** 버튼 클릭
4. 다음 정보 입력:
   - **Name**: `secrets-images` (정확히 이 이름으로!)
   - **Public bucket**: ✅ **체크 필수** (Public으로 설정해야 업로드/조회 가능)

### Bucket이 이미 있는 경우
1. Storage → `secrets-images` bucket 클릭
2. **Settings** 탭에서 **Public bucket** 옵션이 체크되어 있는지 확인
3. 체크되어 있지 않으면 체크하고 저장

## 2. Storage Policies (RLS 정책) 확인

### 자동 정책 생성 (권장)
- Bucket을 **Public**으로 설정하면 자동으로 정책이 생성됩니다.
- Public bucket 설정만으로도 충분합니다.

### 수동 정책 설정 (필요한 경우)
만약 Public bucket 설정이 안 되거나 추가 권한이 필요한 경우:

1. Storage → `secrets-images` → **Policies** 탭
2. 다음 정책들이 있는지 확인:

#### INSERT 정책 (업로드용)
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'secrets-images');
```

#### SELECT 정책 (조회용)
```sql
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'secrets-images');
```

#### UPDATE 정책 (수정용 - 선택사항)
```sql
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'secrets-images');
```

#### DELETE 정책 (삭제용 - 선택사항)
```sql
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'secrets-images');
```

## 3. 환경 변수 확인

프로젝트 루트의 `.env.local` 파일에 다음 변수들이 설정되어 있는지 확인:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

또는

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=your-anon-key-here
```

### 환경 변수 확인 방법
1. Supabase 대시보드 → **Settings** → **API**
2. **Project URL** 복사 → `NEXT_PUBLIC_SUPABASE_URL`에 설정
3. **anon public** 키 복사 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 설정

⚠️ **주의**: `service_role` 키는 사용하지 마세요! 보안상 위험합니다.

## 4. 문제 해결 체크리스트

### 이미지 업로드가 실패하는 경우

#### ✅ Bucket 확인
- [ ] `secrets-images` bucket이 존재하는가?
- [ ] Bucket이 **Public**으로 설정되어 있는가?

#### ✅ 정책 확인
- [ ] Storage Policies에서 INSERT 정책이 있는가?
- [ ] 정책이 `public` 사용자에게 적용되는가?

#### ✅ 환경 변수 확인
- [ ] `.env.local` 파일이 존재하는가?
- [ ] `NEXT_PUBLIC_SUPABASE_URL`이 올바른가?
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 올바른가?
- [ ] 환경 변수 변경 후 개발 서버를 재시작했는가?

#### ✅ 브라우저 콘솔 확인
1. 개발자 도구 열기 (F12)
2. Console 탭에서 에러 메시지 확인
3. Network 탭에서 Storage API 요청 확인
   - Status Code가 200/201이면 성공
   - 401/403이면 권한 문제
   - 404이면 Bucket 없음

## 5. 일반적인 에러 메시지와 해결 방법

### "Storage 권한이 없습니다"
**원인**: RLS 정책이 없거나 Public bucket이 아님
**해결**: 
1. Bucket을 Public으로 설정
2. 또는 Storage Policies에 INSERT 정책 추가

### "secrets-images 버킷을 찾을 수 없습니다"
**원인**: Bucket 이름이 다르거나 Bucket이 없음
**해결**: 
1. Supabase 대시보드에서 Bucket 이름 확인
2. 코드의 bucket 이름과 일치하는지 확인
3. Bucket이 없으면 생성

### "인증 토큰이 만료되었거나 유효하지 않습니다"
**원인**: 환경 변수의 ANON_KEY가 잘못되었거나 만료됨
**해결**: 
1. Supabase 대시보드에서 새로운 ANON_KEY 복사
2. `.env.local` 파일 업데이트
3. 개발 서버 재시작

### "파일 크기가 너무 큽니다"
**원인**: 업로드하려는 파일이 50MB를 초과함
**해결**: 더 작은 이미지 파일 사용 (권장: 5MB 이하)

## 6. 테스트 방법

### 업로드 테스트
1. `/secrets/new` 페이지 접속
2. 이미지 파일 선택
3. 폼 작성 후 등록
4. 브라우저 콘솔에서 다음 로그 확인:
   - ✅ "업로드 성공:" 메시지
   - ✅ "Public URL:" 메시지와 URL
5. Supabase 대시보드 → Storage → `secrets-images` → `secrets/` 폴더에서 파일 확인

### 조회 테스트
1. 등록한 비밀의 상세 페이지 접속
2. 이미지가 정상적으로 표시되는지 확인
3. 이미지 URL을 브라우저 주소창에 직접 입력하여 접근 가능한지 확인

## 7. 추가 참고사항

- Supabase Storage는 무료 플랜에서도 사용 가능합니다
- Public bucket은 누구나 접근 가능하므로 민감한 파일은 사용하지 마세요
- 파일 크기 제한: 무료 플랜 50MB, 유료 플랜 5GB
- 지원하는 이미지 형식: jpg, jpeg, png, gif, webp 등

