"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useRef } from "react";
import Layout from "@/commons/layout";
import BoardsDetail from "@/components/boards-detail/detail";
import CommentWrite from "@/components/boards-detail/comment-write";
import CommentList from "@/components/boards-detail/comment-list";

export default function BoardsDetailPage() {
  const { boardId } = useParams() as { boardId: string };
  const searchParams = useSearchParams();
  const commentListRefetchRef = useRef<(() => void) | null>(null);
  
  // 이전 페이지 정보 가져오기
  const fromParams = searchParams?.get('from');

  const handleCommentListRefetch = (refetchFn: () => void) => {
    commentListRefetchRef.current = refetchFn;
  };

  const handleCommentCompleted = () => {
    if (commentListRefetchRef.current) {
      commentListRefetchRef.current();
    }
  };

  return (
    <Layout>
      <BoardsDetail boardId={boardId} fromParams={fromParams} />
      <CommentWrite
        boardId={boardId}
        boardCommentId=""
        isEdit={false}
        onCompleted={handleCommentCompleted}
      />
      <CommentList 
        boardId={boardId} 
        onRefetch={handleCommentListRefetch}
      />
    </Layout>
  );
}