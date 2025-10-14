"use client";

import React from "react";
import { useOpenApiNew } from "./hook";
import styles from "./styles.module.css";

export default function OpenApiNew() {
  const { content, updateContent, onClickSubmit, isLoading, error } = useOpenApiNew();

  return (
    <div className={styles.newContainer}>
      <h1>사용자 등록</h1>
      <input
        type="text"
        placeholder="이름"
        value={content.name}
        onChange={(e) => updateContent("name", e.target.value)}
      />
      <input
        type="email"
        placeholder="이메일"
        value={content.email}
        onChange={(e) => updateContent("email", e.target.value)}
      />
      <input
        type="text"
        placeholder="사진 URL"
        value={content.picture_url || ""}
        onChange={(e) => updateContent("picture_url", e.target.value)}
      />
      <input
        type="text"
        placeholder="국적"
        value={content.nat || ""}
        onChange={(e) => updateContent("nat", e.target.value)}
      />
      <button onClick={onClickSubmit} disabled={isLoading}>
        {isLoading ? "등록 중..." : "등록하기"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}