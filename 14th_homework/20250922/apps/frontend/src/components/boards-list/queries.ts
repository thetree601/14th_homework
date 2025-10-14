import { gql } from "@apollo/client";

// 게시글 목록을 가져오는 쿼리
export const FETCH_BOARDS_DOCUMENT = gql`
  query FetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

// 게시글 총 개수를 가져오는 쿼리
export const FETCH_BOARDS_COUNT_DOCUMENT = gql`
  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {
    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
  }
`;

// 게시글 삭제 mutation
export const DeleteBoardDocument = gql`
  mutation DeleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
