"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import CommentWrite from "@/components/boards-detail/comment-write";

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
    <li style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#e5e7eb" }} />
        <div style={{ fontWeight: 600 }}>{comment.writer || "익명"}</div>
        <Rating
          value={comment.rating}
          readOnly
          size="small"
          sx={{ color: "#f26d21", marginLeft: "auto" }}
        />
        <button
          onClick={() => setIsEdit(true)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
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
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <Image
            src="/images/commentdelete.png"
            alt="삭제"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div style={{ color: "#374151", lineHeight: 1.6 }}>{comment.contents}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "#9CA3AF" }}>{date}</div>
    </li>
  );
}