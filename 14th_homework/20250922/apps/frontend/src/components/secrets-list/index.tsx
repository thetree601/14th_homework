"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { authManager } from "@/lib/auth";
import { FETCH_USER_LOGGED_IN } from "@/commons/layout/navigation/queries";
import HotSecrets from "./hot-secrets";
import SaleSecrets from "./sale-secrets";
import RecommendedSecrets from "./recommended-secrets";
import { hotSecrets, saleSecrets, recommendedSecrets } from "./mockData";
import LoginModal from "./modals/LoginModal";
import styles from "./styles.module.css";

export default function SecretsListPage() {
  const pathname = usePathname();
  const { openModal, closeModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authManager.initializeToken();
    setIsLoggedIn(authManager.isLoggedIn());
  }, []);

  const { data } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !authManager.isLoggedIn(),
    errorPolicy: 'ignore',
    onCompleted: () => {
      setIsLoggedIn(true);
    },
    onError: () => {
      setIsLoggedIn(false);
    }
  });

  const handleLoginClick = () => {
    openModal(
      <LoginModal
        onCancel={closeModal}
        onSuccess={() => {
          setIsLoggedIn(true);
          closeModal();
        }}
      />
    );
  };

  const handleLogoutClick = () => {
    authManager.clearToken();
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className={styles.container}>
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
          {isLoggedIn ? (
            <button
              onClick={handleLogoutClick}
              className={styles.logoutButton}
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className={styles.loginButton}
            >
              로그인
            </button>
          )}
        </div>
        <h1 className={styles.mainTitle}>who&apos;s Secret</h1>
        <p className={styles.mainSubtitle}>
          누구나 알고 싶지만, 아무도 말하지 않는 이야기들.
        </p>
      </div>

      <HotSecrets secrets={hotSecrets} />
      <SaleSecrets secrets={saleSecrets} />
      <RecommendedSecrets secrets={recommendedSecrets} />
    </div>
  );
}

