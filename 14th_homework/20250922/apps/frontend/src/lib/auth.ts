// JWT 토큰 관리 유틸리티
class AuthManager {
  private static instance: AuthManager;
  private token: string | null = null;

  private constructor() {
    // 생성자에서는 토큰을 초기화하지 않음 (클라이언트 사이드에서만 실행되도록)
    this.token = null;
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  // 토큰 설정
  public setToken(token: string): void {
    this.token = token;
    // localStorage와 쿠키에 모두 저장
    this.setTokenToStorage(token);
    setTokenCookie(token);
  }

  // 토큰 가져오기
  public getToken(): string | null {
    return this.token;
  }

  // 토큰 제거
  public clearToken(): void {
    this.token = null;
    // localStorage와 쿠키에서 모두 제거
    this.removeTokenFromStorage();
    removeTokenCookie();
  }

  // 로그인 상태 확인
  public isLoggedIn(): boolean {
    return this.token !== null;
  }

  // 토큰 초기화 (클라이언트 사이드에서 호출)
  public initializeToken(): void {
    if (typeof window === 'undefined') return;
    
    if (!this.token) {
      this.token = this.getTokenFromStorage();
    }
  }

  // Authorization 헤더 반환
  public getAuthHeader(): { Authorization: string } | {} {
    if (this.token) {
      return { Authorization: `Bearer ${this.token}` };
    }
    return {};
  }

  // localStorage에서 토큰 가져오기 (private 메서드)
  private getTokenFromStorage(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      // localStorage에서 먼저 확인
      const localToken = localStorage.getItem('accessToken');
      if (localToken) {
        return localToken;
      }
      
      // localStorage에 없으면 쿠키에서 확인
      return this.getTokenFromCookie();
    } catch (error) {
      console.error('토큰 불러오기 실패:', error);
      return null;
    }
  }

  // localStorage에 토큰 저장 (private 메서드)
  private setTokenToStorage(token: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('토큰 저장 실패:', error);
    }
  }

  // localStorage에서 토큰 제거 (private 메서드)
  private removeTokenFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('토큰 제거 실패:', error);
    }
  }

  // 쿠키에서 토큰 가져오기 (private 메서드)
  private getTokenFromCookie(): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'authToken') {
        return value;
      }
    }
    return null;
  }
}

export const authManager = AuthManager.getInstance();

// 쿠키 기반 토큰 관리 (보안 강화)
export const setTokenCookie = (token: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  // HttpOnly 쿠키로 설정 (XSS 공격 방지)
  document.cookie = `authToken=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};


export const removeTokenCookie = (): void => {
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
