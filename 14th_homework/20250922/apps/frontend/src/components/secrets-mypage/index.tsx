"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserInfo from "./user-info";
import MySecrets from "./my-secrets";
import SubscriptionStatus from "./subscription-status";
import PointHistory from "./point-history";
import styles from "./styles.module.css";

export default function SecretsMyPage() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 클라이언트에서만 pathname 사용하여 Hydration 에러 방지
  const currentPathname = mounted ? pathname : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.navigation}>
          <Link 
            href="/secrets" 
            className={`${styles.navLink} ${currentPathname === "/secrets" ? styles.active : ""}`}
          >
            비밀 게시판
          </Link>
          <Link 
            href="/secrets/mypage" 
            className={`${styles.navLink} ${currentPathname === "/secrets/mypage" ? styles.active : ""}`}
          >
            마이 페이지
          </Link>
        </div>
        <h1 className={styles.mainTitle}>마이 페이지</h1>
        <p className={styles.mainSubtitle}>
          나의 비밀 거래 내역과 포인트 사용내역을 확인하세요.
        </p>
      </div>

      <UserInfo />
      <MySecrets />
      <SubscriptionStatus />
      <PointHistory />
    </div>
  );
}

