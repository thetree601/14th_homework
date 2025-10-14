"use client";

import React from "react";
import Link from "next/link";
import { useOpenApiList } from "./hook";
import styles from "./styles.module.css";
import { Content } from "./types";

export default function OpenApiList() {
  const { users, isLoading, error } = useOpenApiList();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>에러 발생: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {users.map((user: Content, index: number) => (
        <Link 
          key={user.id} 
          href={`/openapis/${user.id}`} 
          className={styles.cardLink}
        >
          <div className={styles.card}>
            <img
              src={user.picture_url}
              alt={user.name}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.cardContent}>
              <h3 className={styles.name}>{user.name}</h3>
              <p className={styles.nat}>국적: {user.nat}</p>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}