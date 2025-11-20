"use client";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from "@apollo/client/link/context";
import { authManager } from "@/lib/auth";
import { getAccessToken } from "@/lib/refresh-token";
import React from "react";

export default function ApiUploadProvider(props) {
  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql", // 직접 GraphQL 엔드포인트로 요청
    credentials: "include", // CORS 문제 해결을 위해 추가
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

  const client = new ApolloClient({
    link: from([errorLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all", // 에러가 발생해도 부분 데이터를 표시
      },
      query: {
        errorPolicy: "all",
      },
    },
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
