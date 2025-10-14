export interface IBoard {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchBoardsData {
  fetchBoards: {
    boards: IBoard[];
    count: number;
  }
}

export interface BoardsListProps {
  boards: IBoard[];
  onClickDelete: (boardId: string) => void;
  onClickRow: (boardId: string) => void;
  searchKeyword?: string;
}
