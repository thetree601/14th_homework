import { gql, GraphQLClient } from "graphql-request";
import { authManager } from "./auth";

// GraphQL 엔드포인트
const GRAPHQL_ENDPOINT = "https://main-practice.codebootcamp.co.kr/graphql";

// Refresh Token으로 새로운 Access Token 받아오기
const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`;

/**
 * Refresh Token을 사용하여 새로운 Access Token을 발급받습니다.
 * Refresh Token은 쿠키에 저장되어 있으며, credentials: "include"로 자동 전송됩니다.
 * @returns 새로운 Access Token 또는 null (실패 시)
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
      credentials: "include", // 쿠키에 저장된 refresh token을 자동으로 전송
    });

    const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;

    if (newAccessToken) {
      // 새 Access Token을 authManager에 저장
      authManager.setToken(newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error("Access Token 갱신 실패:", error);
    // Refresh Token도 만료되었거나 유효하지 않은 경우
    authManager.clearToken();
    return null;
  }
};

