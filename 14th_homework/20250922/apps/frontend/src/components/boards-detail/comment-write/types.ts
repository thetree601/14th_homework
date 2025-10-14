export interface CommentWriteProps {
  boardId: string;
  boardCommentId?: string;
  isEdit?: boolean;
  defaultValues?: {
    contents: string;
    rating: number;
  };
  onCancel?: () => void;
  // 이 부분 추가
  onCompleted?: () => void;
}