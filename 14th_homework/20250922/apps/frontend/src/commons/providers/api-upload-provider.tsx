"use client";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import React from "react";

export default function ApiUploadProvider(props) {
  const uploadLink = createUploadLink({
    uri: "/api/graphql", // Next.js 프록시를 통해 요청
    credentials: "include", // CORS 문제 해결을 위해 추가
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
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
