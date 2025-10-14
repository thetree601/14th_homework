// src/components/boards-detail/comment-list/queries.ts
import { gql } from "@apollo/client";

export const FETCH_COMMENTS = gql`
  query FetchBoardComments($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      rating
      user {
        _id
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;