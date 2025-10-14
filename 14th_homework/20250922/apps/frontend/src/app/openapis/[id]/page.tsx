"use client";

import React from "react";
import { useParams } from "next/navigation";
import OpenApiDetail from "@/components/openapis-detail";

export default function OpenApiDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // 배열이면 첫 번째 요소, 아니면 문자열
  return <OpenApiDetail id={id as string} />;
}