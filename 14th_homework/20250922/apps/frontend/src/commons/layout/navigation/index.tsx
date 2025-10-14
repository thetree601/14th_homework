"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Navigation from "../../../components/ui/Navigation";
import { FETCH_USER_LOGGED_IN } from "./queries";
import { authManager } from "@/lib/auth";

export default function NavigationWrapper() {
  const [isInitialized, setIsInitialized] = useState(false);

  // 페이지 로드 시 localStorage에서 토큰 불러오기
  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log('authManager isLoggedIn before:', authManager.isLoggedIn());
        
        // authManager에서 토큰 초기화
        authManager.initializeToken();
        
        console.log('authManager isLoggedIn after:', authManager.isLoggedIn());
        console.log('authManager token:', authManager.getToken());
      } catch (error) {
        console.error('토큰 초기화 실패:', error);
      } finally {
        setIsInitialized(true);
        console.log('초기화 완료, authManager isLoggedIn:', authManager.isLoggedIn());
      }
    };

    initializeAuth();
  }, []);

  const { data, error } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !authManager.isLoggedIn(), // 로그인 상태가 아닐 때는 쿼리 실행하지 않음
    errorPolicy: 'ignore' // 에러가 발생해도 무시 (로그아웃 상태일 수 있음)
  });

  // 로그인 상태 확인: authManager에 토큰이 있으면 로그인 상태로 간주
  const isLoggedIn = authManager.isLoggedIn();
  const user = data?.fetchUserLoggedIn;

  // 디버깅을 위한 로그
  console.log('Navigation Debug:', {
    isInitialized,
    authManagerToken: authManager.getToken(),
    authManagerIsLoggedIn: authManager.isLoggedIn(),
    graphqlData: data?.fetchUserLoggedIn,
    graphqlError: error,
    finalIsLoggedIn: isLoggedIn,
    user: user,
    localStorageToken: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : 'N/A'
  });

  return (
    <Navigation 
      isLoggedIn={isLoggedIn}
      user={user}
      onLogin={() => console.log('Login clicked')}
      onLogout={() => {
        authManager.logout();
        window.location.reload();
      }}
    />
  );
}
