// src/app/boards/page.tsx

"use client";

import Layout from "@/commons/layout";
import BoardsListContainer from "@/components/boards-list/container";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BoardsPageContent() {
  const searchParams = useSearchParams();
  
  // URL에서 페이지 번호를 가져오기 (기본값: 1)
  const currentPage = parseInt(searchParams?.get('page') || '1', 10);
  
  return (
    <BoardsListContainer initialPage={currentPage} />
  );
}

export default function BoardsPage() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <BoardsPageContent />
      </Suspense>
    </Layout>
  );
}