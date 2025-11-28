import React from "react";

interface LoadingSectionProps {
  isLoading: boolean;
  loadingMessage?: string;
  children: React.ReactNode;
}

export default function LoadingSection({ 
  isLoading, 
  loadingMessage = "로딩 중...", 
  children 
}: LoadingSectionProps) {
  if (isLoading) {
    const padding = loadingMessage === "로딩 중..." ? '2rem' : '1rem';
    return (
      <div style={{ textAlign: 'center', padding }}>
        {loadingMessage}
      </div>
    );
  }

  return <>{children}</>;
}

