// 기존 타입들
export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  login: {
    uuid: string;
  };
}

export interface UserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

// 새로 추가 (Supabase 테이블용)
export interface Content {
  id: string;
  name: string;
  email: string;
  picture_url?: string;
  nat?: string;
  created_at: string;
}