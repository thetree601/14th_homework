import React from "react";
import { LoadingProps } from "../../../types/ui-components";

export default function Loading({ size = 'medium', message = '로딩 중...' }: LoadingProps) {
  return (
    <div className="loadingContainer">
      <div className={`loadingSpinner ${size}`}></div>
      <div className="loadingMessage">{message}</div>
    </div>
  );
}
