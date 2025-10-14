"use client";

import React from "react";
import { Rating } from "@mui/material";
import { useCommentWrite } from "./hook";
import type { CommentWriteProps } from "./types";
import styles from "./styles.module.css";

export default function CommentWrite({
  boardId,
  boardCommentId = "", // 기본값 빈 문자열
  isEdit = false,
  defaultValues,
  onCancel,
  onCompleted,
}: CommentWriteProps) {
  console.log("Sending to useCommentWrite:", { boardId, boardCommentId, isEdit }); // 이거 추가
  const {
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
    loading,
  } = useCommentWrite({
    boardId,
    boardCommentId,
    isEdit,
    defaultValues,
    onCompleted,
  });

  const contentsLength = contents.length;

  return (
    <div className={styles.contentContainer}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <h3 className={styles.postTitle} style={{ margin: 0 }}>
          댓글 {isEdit ? "수정" : "작성"}
        </h3>
        <Rating
          value={rating}
          onChange={(event, newValue) => setRating(newValue || 0)}
          size="medium"
          sx={{ color: "#f26d21" }}
        />
      </div>

      <div className={`${styles.formGroup} ${styles.firstGroup}`}>
        <div className={styles.formRowGroup}>
          <div className={styles.flex1}>
            <label className={styles.labelRequired}>작성자</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="작성자를 입력해 주세요."
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              disabled={isEdit} // 수정 모드에서 작성자 변경 불가
            />
          </div>
          <div className={styles.flex1}>
            <label className={styles.labelRequired}>비밀번호</label>
            <input
              type="password"
              className={styles.inputField}
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.noBorder}`}>
        <textarea
          className={styles.textareaField}
          placeholder="댓글을 입력해 주세요."
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          maxLength={100}
          rows={5}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span style={{ color: "#9CA3AF", fontSize: 12 }}>{contentsLength}/100</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className={`${styles.button} ${isValid ? styles.primary : ""}`}
              onClick={onClickSubmit}
              disabled={!isValid || loading}
              style={isValid ? { backgroundColor: "var(--color-primary)", color: "#fff" } : {}}
            >
              {isEdit ? "수정하기" : "댓글 등록"}
            </button>
            {isEdit && (
              <button
                className={styles.button}
                onClick={onCancel}
                style={{ backgroundColor: "#6b7280", color: "#fff" }}
              >
                취소
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}