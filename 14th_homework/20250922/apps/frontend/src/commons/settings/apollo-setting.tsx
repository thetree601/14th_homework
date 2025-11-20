"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';
import { authManager } from '@/lib/auth';
import { getAccessToken } from '@/lib/refresh-token';
import React from 'react';

// 파일 업로드 링크 생성
const uploadLink = createUploadLink({
  uri: "https://main-practice.codebootcamp.co.kr/graphql",
  credentials: "include",
});

// 인증 헤더를 추가하는 링크
const authLink = setContext((_, { headers }) => {
  // authManager에서 토큰 가져오기 전에 초기화
  authManager.initializeToken();
  const token = authManager.getToken();
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// 에러 처리 링크 - 토큰 만료 시 자동 refresh
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const { message, extensions } of graphQLErrors) {
      // UNAUTHENTICATED 에러 처리 (토큰 만료 등)
      if (extensions?.code === 'UNAUTHENTICATED' || message.includes('토큰 만료')) {
        console.warn('인증 토큰이 만료되었습니다. Refresh Token으로 갱신 시도...');
        
        // Refresh Token으로 새 Access Token 발급 시도
        return getAccessToken().then((newToken) => {
          if (newToken) {
            // 새 토큰으로 요청 재시도
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${newToken}`,
              },
            });
            return forward(operation);
          } else {
            // Refresh Token도 만료되었거나 유효하지 않은 경우
            console.error('Refresh Token으로 Access Token 갱신 실패. 로그인이 필요합니다.');
            authManager.clearToken();
            return Promise.reject(new Error('세션이 만료되었습니다. 다시 로그인해주세요.'));
          }
        }).catch((error) => {
          console.error('토큰 갱신 중 오류 발생:', error);
          authManager.clearToken();
          return Promise.reject(error);
        });
      }
    }
  }

  if (networkError) {
    console.error('네트워크 에러:', networkError);
  }
});

// 링크 체인 구성 (에러 처리 -> 인증 -> 업로드/HTTP)
const link = from([errorLink, authLink, uploadLink]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default function ApolloSetting(props: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}