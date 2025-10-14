
export interface UpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  images?: string[];
}

export interface BoardsWriteProps {
  isEdit: boolean;
  boardId?: string;
}

export interface FetchBoardForEditData {
  fetchBoard: {
    _id: string;
    writer: string;
    title: string;
    contents: string;
    youtubeUrl?: string | null;
    boardAddress?: {
      zipcode?: string | null;
      address?: string | null;
      addressDetail?: string | null;
    } | null;
    images?: string[] | null;
  } | null;
}


