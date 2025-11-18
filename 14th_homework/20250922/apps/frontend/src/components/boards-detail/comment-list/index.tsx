"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { FixedSizeList as List } from "react-window";
import CommentListItem from "@/components/boards-detail/comment-list-item";
import styles from "./styles.module.css";

const FETCH_BOARD_COMMENTS_LIST = gql`
  query fetchBoardCommentsList($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      rating
      createdAt
      __typename
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteBoardComment($boardCommentId: ID!, $password: String) {
    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)
  }
`;

interface CommentListProps {
  boardId: string;
  onRefetch?: (refetchFn: () => void) => void;
}

interface BoardCommentItem {
  _id: string;
  writer?: string | null;
  contents: string;
  rating: number;
  createdAt: string;
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    comments: BoardCommentItem[];
    onDelete: (id: string) => void;
    boardId: string;
  };
}

const COMMENT_ITEM_HEIGHT = 120;
const LIST_CONTAINER_HEIGHT = 600;

const Row = ({ index, style, data }: RowProps) => {
  const comment = data.comments[index];
  if (!comment) return null;
  
  return (
    <div style={style}>
      <CommentListItem
        comment={comment}
        onDelete={data.onDelete}
        boardId={data.boardId}
      />
    </div>
  );
};

export default function CommentList(props: CommentListProps) {
  const { boardId, onRefetch } = props;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const listRef = useRef<List>(null);

  const { data, loading, error, refetch, fetchMore } = useQuery(FETCH_BOARD_COMMENTS_LIST, {
    variables: { boardId, page: 1 },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("fetchBoardComments boardId:", boardId, "data:", data);
    },
  });

  // refetch 함수를 부모 컴포넌트에 전달
  React.useEffect(() => {
    if (onRefetch) {
      const refetchFunction = () => {
        setPage(1);
        setHasMore(true);
        refetch();
      };
      onRefetch(refetchFunction);
    }
  }, [onRefetch, refetch]);

  console.log("CommentList data:", data?.fetchBoardComments);

  const [deleteComment] = useMutation(DELETE_COMMENT);

  const comments: BoardCommentItem[] = data?.fetchBoardComments ?? [];

  // refetch 후 상태 초기화
  useEffect(() => {
    setPage(1); // 페이지 1로 초기화
    setHasMore(true); // hasMore 초기화
  }, [data]); // data 변경 시 초기화

  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    
    const nextPage = page + 1;
    try {
      const { data: newData } = await fetchMore({
        variables: { boardId, page: nextPage },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.fetchBoardComments.length === 0) {
            setHasMore(false);
            return prev;
          }
          return {
            fetchBoardComments: [
              ...prev.fetchBoardComments,
              ...fetchMoreResult.fetchBoardComments,
            ],
          };
        },
      });
      if (newData.fetchBoardComments.length < limit) {
        setHasMore(false);
      }
      setPage(nextPage);
    } catch {
      setHasMore(false);
    }
  }, [boardId, page, hasMore, fetchMore]);

  const handleItemsRendered = useCallback(
    ({
      visibleStopIndex,
    }: {
      overscanStartIndex: number;
      overscanStopIndex: number;
      visibleStartIndex: number;
      visibleStopIndex: number;
    }) => {
      const totalItems = comments.length;
      if (visibleStopIndex >= totalItems - 1 && hasMore) {
        loadMore();
      }
    },
    [comments.length, hasMore, loadMore]
  );

  const handleDelete = async (id: string) => {
    const password = prompt("비밀번호를 입력하세요:");
    if (!password) return;
    try {
      await deleteComment({
        variables: { boardCommentId: id, password },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS_LIST,
            variables: { boardId, page: 1 },
            fetchPolicy: "network-only",
          },
        ],
        onCompleted: (data) => {
          console.log("deleteBoardComment completed:", data, "boardId:", boardId);
          refetch(); // 이미 있음
          setPage(1); // 페이지 초기화
          setHasMore(true); // hasMore 초기화
        },
        onError: (error) => {
          console.error("deleteBoardComment error:", error);
        },
      });
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  if (loading && page === 1) {
    return <div className="text-center mt-4 text-gray-500">댓글을 불러오는 중...</div>;
  }
  if (error) {
    return <div className="text-center mt-4 text-red-500">댓글을 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!comments.length) {
    return <div className="text-center mt-6 text-gray-400">등록된 댓글이 없습니다.</div>;
  }

  const listHeight = Math.min(
    LIST_CONTAINER_HEIGHT,
    comments.length * COMMENT_ITEM_HEIGHT
  );

  return (
    <div className={styles.contentContainer}>
      <h3 className={styles.postTitle}>댓글</h3>
      <div className={styles.listWrapper}>
        <List
          ref={listRef}
          height={listHeight}
          itemCount={comments.length}
          itemSize={COMMENT_ITEM_HEIGHT}
          width="100%"
          itemData={{
            comments,
            onDelete: handleDelete,
            boardId,
          }}
          onItemsRendered={handleItemsRendered}
          className={styles.virtualizedList}
        >
          {Row}
        </List>
        {hasMore && comments.length > 0 && (
          <div className={styles.loader}>로딩 중...</div>
        )}
        {!hasMore && comments.length > 0 && (
          <div className={styles.endMessage}>댓글 끝!</div>
        )}
      </div>
    </div>
  );
}