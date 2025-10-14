export interface BoardsDetailProps {
  boardId: string;
  fromParams?: string | null; // 이전 페이지 정보
}

export interface FetchBoardData {
  fetchBoard: {
    _id: string;
    writer?: string | null;
    title: string;
    contents: string;
    likeCount: number;
    dislikeCount: number;
    createdAt: any;
    updatedAt: any;
  } | null;
}


