import React from "react";
import { ErrorOutline } from "@mui/icons-material";
import { ErrorProps } from "../../../types/ui-components";

export default function Error({ message = '오류가 발생했습니다.', onRetry }: ErrorProps) {
  return (
    <div className="errorContainer">
      <ErrorOutline className="errorIcon" />
      <div className="errorMessage">{message}</div>
      {onRetry && (
        <button className="retryButton" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}
