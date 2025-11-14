import { supabase } from '@/lib/supabase-client';
import { Secret, SecretRow } from './types';

export async function fetchHotSecrets(): Promise<Secret[]> {
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('category', 'hot')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching hot secrets:', error);
    return [];
  }
  
  console.log('✅ Supabase에서 hot secrets 가져옴:', data?.length, '개');
  
  // 디버깅: 메인 페이지에서 가져오는 img 값 확인
  if (data && data.length > 0) {
    const firstItem = data[0] as SecretRow;
    console.log('🔍 메인 페이지 첫 번째 아이템 img 값:', firstItem.img);
    console.log('🔍 메인 페이지 첫 번째 아이템 img 타입:', typeof firstItem.img);
  }
  
  return (data as SecretRow[]).map(item => ({
    id: item.id,
    title: item.title,
    desc: item.desc,
    price: item.price,
    img: item.img,
  }));
}

export async function fetchSaleSecrets(): Promise<Secret[]> {
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('category', 'sale')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching sale secrets:', error);
    return [];
  }
  
  console.log('✅ Supabase에서 sale secrets 가져옴:', data?.length, '개');
  
  return (data as SecretRow[]).map(item => ({
    id: item.id,
    title: item.title,
    desc: item.desc,
    price: item.price,
    img: item.img,
    saleEnds: item.sale_ends || undefined,
  }));
}

export async function fetchRecommendedSecrets(): Promise<Secret[]> {
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('category', 'recommended')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching recommended secrets:', error);
    return [];
  }
  
  console.log('✅ Supabase에서 recommended secrets 가져옴:', data?.length, '개');
  
  // 디버깅: "그 회사의 비밀" 찾기
  if (data) {
    const targetSecret = data.find((item: any) => item.title?.includes('그 회사의 비밀'));
    if (targetSecret) {
      console.log('🎯 찾은 비밀:', targetSecret.id);
      console.log('🖼️ 찾은 비밀의 img 값:', targetSecret.img);
      console.log('🖼️ 찾은 비밀의 img 타입:', typeof targetSecret.img);
      console.log('🖼️ 찾은 비밀의 전체 데이터:', JSON.stringify(targetSecret, null, 2));
    }
  }
  
  return (data as SecretRow[]).map(item => ({
    id: item.id,
    title: item.title,
    desc: item.desc,
    price: item.price,
    img: item.img,
  }));
}

// 상세페이지용: ID로 secret 조회
export async function fetchSecretById(secretId: string) {
  console.log('=== fetchSecretById 함수 시작 ===');
  console.log('🔑 fetchSecretById 호출됨, secretId:', secretId);
  
  // 메인 페이지와 동일하게 select('*') 사용
  // 캐시를 사용하지 않도록 설정하여 항상 최신 데이터를 가져옴
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('id', secretId)
    .single();
  
  if (error) {
    console.error('❌ Supabase 쿼리 에러:', error);
    return null;
  }
  
  if (!data) {
    console.error('❌ data가 null입니다');
    return null;
  }
  
  // 타입 캐스팅 없이 직접 data에서 값 가져오기 (메인 페이지와 동일하게)
  const rawData = data as any;
  const result = {
    id: rawData.id,
    title: rawData.title,
    description: rawData.description || rawData.desc || '',
    img: rawData.img, // 데이터베이스 컬럼명 img를 그대로 사용
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

