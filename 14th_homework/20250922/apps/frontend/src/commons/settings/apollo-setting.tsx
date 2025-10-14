"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { setContext } from '@apollo/client/link/context';
import { authManager } from '@/lib/auth';
import React from 'react';

// 파일 업로드 링크 생성
const uploadLink = createUploadLink({
  uri: "http://main-practice.codebootcamp.co.kr/graphql"
});

// 인증 헤더를 추가하는 링크
const authLink = setContext((_, { headers }) => {
  // authManager에서 토큰 가져오기
  const token = authManager.getToken();
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// 링크 체인 구성 (인증 -> 업로드/HTTP)
const link = authLink.concat(uploadLink);

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