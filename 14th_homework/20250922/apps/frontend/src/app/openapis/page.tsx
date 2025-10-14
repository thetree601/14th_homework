"use client";

import React from "react";
import OpenApiList from "@/components/openapis-list";

export default function OpenApisPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">랜덤 사용자 목록</h1>
        <OpenApiList />
      </div>
    </div>
  );
}