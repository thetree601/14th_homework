"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import CommentWrite from "@/components/boards-detail/comment-write";
import styles from "./styles.module.css";

interface BoardCommentItem {
  _id: string;
  writer?: string | null;
  contents: string;
  rating: number;
  createdAt: string;
}

interface CommentListItemProps {
  comment: BoardCommentItem;
  onDelete: (id: string) => void;
  boardId: string;
}

export default function CommentListItem({ comment, onDelete, boardId }: CommentListItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const date = new Date(comment.createdAt).toLocaleDateString("ko-KR");

  if (isEdit) {
    // console.log("Passing to CommentWrite:", { boardId, boardCommentId: comment._id }); // 디버깅
    console.log("보내는 값:", { boardId, boardCommentId: comment._id });
    return (
        <CommentWrite
        boardId={boardId}
        boardCommentId={comment._id}
        isEdit={true}
        defaultValues={{ contents: comment.contents, rating: comment.rating }}
        onCancel={() => setIsEdit(false)}
        onCompleted={() => setIsEdit(false)}
        />
    );
  }

  return (
    <li className={styles.commentItem}>
      <div className={styles.header}>
        <div className={styles.avatar} />
        <div className={styles.writer}>{comment.writer || "익명"}</div>
        <div className={styles.ratingWrapper}>
          <Rating
            value={comment.rating}
            readOnly
            size="small"
            sx={{ color: "#f26d21" }}
          />
          <button
            onClick={() => setIsEdit(true)}
            className={styles.button}
          >
            <Image
              src="/images/commentedit.png"
              alt="수정"
              width={20}
              height={20}
            />
          </button>
          <button
            onClick={() => onDelete(comment._id)}
            className={styles.button}
          >
            <Image
              src="/images/commentdelete.png"
              alt="삭제"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div className={styles.content}>{comment.contents}</div>
      <div className={styles.date}>{date}</div>
    </li>
  );
}