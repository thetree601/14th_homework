"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS, UPDATE_BOARD_COMMENT } from "./queries";
import type { CommentWriteProps } from "./types";

export function useCommentWrite({ boardId, boardCommentId, isEdit, defaultValues, onCompleted }: CommentWriteProps) {
  const [writer, setWriter] = useState(isEdit ? (defaultValues?.writer || "") : "");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState(defaultValues?.contents || "");
  const [rating, setRating] = useState(defaultValues?.rating || 0);

  const [createBoardComment, { loading: createLoading }] = useMutation(CREATE_BOARD_COMMENT, {
    onCompleted: (data) => {
      console.log("createBoardComment completed:", data);
      if (onCompleted) {
        onCompleted();
      }
    },
    onError: (error) => {
      console.error("createBoardComment error:", error.message);
    },
  });

  const [updateBoardComment, { loading: updateLoading }] = useMutation(UPDATE_BOARD_COMMENT, {
    onCompleted: (data) => {
      console.log("updateBoardComment boardId:", boardId, "boardCommentId:", boardCommentId);
      console.log("updateBoardComment completed:", data);
      if (onCompleted) {
        onCompleted();
      }
    },
    onError: (error) => {
      console.error("updateBoardComment error:", error.message);
    },
  });

  const isValid = useMemo(
    () => (isEdit ? contents.trim() && rating > 0 : writer.trim() && contents.trim() && rating > 0),
    [writer, contents, rating, isEdit]
  );

  const onClickSubmit = async () => {
    if (!isValid) {
      console.log("Validation failed:", { writer, contents, rating, password });
      return;
    }
    try {
      if (isEdit) {
        if (!boardCommentId) {
          console.error("boardCommentId is missing for update");
          return;
        }
        console.log("Submitting updateBoardComment:", { boardId, boardCommentId, contents, rating, password });
        await updateBoardComment({
          variables: {
            boardCommentId,
            updateBoardCommentInput: { contents, rating: parseFloat(rating.toString()) },
            password: password || undefined,
          },
        });
      } else {
        await createBoardComment({
          variables: {
            boardId,
            createBoardCommentInput: { writer, password: password || undefined, contents, rating: parseFloat(rating.toString()) },
          },
        });
        setWriter("");
        setPassword("");
        setContents("");
        setRating(0);
      }
    } catch (error) {
      console.error("댓글 처리 오류:", error.message);
    }
  };

  return {
    writer,
    password,
    contents,
    rating,
    setWriter,
    setPassword,
    setContents,
    setRating,
    isValid,
    onClickSubmit,
    loading: createLoading || updateLoading,
  };
}