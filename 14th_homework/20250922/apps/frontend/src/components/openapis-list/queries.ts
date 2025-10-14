import { UserResponse } from "./types";

export async function fetchUsers(count: number): Promise<UserResponse> {
  const response = await fetch(`/api/users?count=${count}`);
  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status}`);
  }
  const data = await response.json();
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error("잘못된 응답 형식");
  }
  return data;
}