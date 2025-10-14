import { gql } from "@apollo/client";

export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {
    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {
      _id
    }
  }
`;

export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment($boardCommentId: ID!, $updateBoardCommentInput: UpdateBoardCommentInput!, $password: String) {
    updateBoardComment(boardCommentId: $boardCommentId, updateBoardCommentInput: $updateBoardCommentInput, password: $password) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_BOARD_COMMENTS_WRITE = gql`
  query fetchBoardCommentsWrite($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;