import { UserResponse } from "../openapis-list/types";

export async function fetchUsers(count: number = 1): Promise<UserResponse> {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  if (!response.ok) {
    throw new Error("API 호출 실패");
  }
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }
  return data;
}