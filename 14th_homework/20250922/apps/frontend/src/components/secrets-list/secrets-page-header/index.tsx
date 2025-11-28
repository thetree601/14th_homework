"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

interface SecretsPageHeaderProps {
  title: string;
  subtitle: string;
  authButton?: React.ReactNode;
}

export default function SecretsPageHeader({ 
  title, 
  subtitle, 
  authButton 
}: SecretsPageHeaderProps) {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <div className={styles.navigation}>
        <Link 
          href="/secrets" 
          className={`${styles.navLink} ${pathname === "/secrets" ? styles.active : ""}`}
        >
          비밀 게시판
        </Link>
        <Link 
          href="/secrets/mypage" 
          className={`${styles.navLink} ${pathname === "/secrets/mypage" ? styles.active : ""}`}
        >
          마이 페이지
        </Link>
        {authButton}
      </div>
      <h1 className={styles.mainTitle}>{title}</h1>
      <p className={styles.mainSubtitle}>
        {subtitle}
      </p>
    </div>
  );
}

