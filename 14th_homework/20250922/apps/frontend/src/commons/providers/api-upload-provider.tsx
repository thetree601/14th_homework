"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from "@apollo/client/link/context";
import { authManager } from "@/lib/auth";
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

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),
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
