"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "@/commons/layout/navigation/queries";
import { authManager } from "@/lib/auth";
import PasswordChange from "../password-change";
import styles from "./styles.module.css";

export default function UserInfo() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    authManager.initializeToken();
    setIsLoggedIn(authManager.isLoggedIn());
  }, []);

  const { data, loading, error } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !mounted || !isLoggedIn, // 클라이언트에서만 실행하여 Hydration 에러 방지
    errorPolicy: "ignore",
  });

  const user = data?.fetchUserLoggedIn;
  const pointAmount = user?.userPoint?.amount ?? 0;

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  // 서버 사이드에서는 로딩 상태만 표시하여 Hydration 에러 방지
  if (!mounted) {
    return (
      <section className={styles.userInfoSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 정보</h2>
          <p className={styles.sectionSubtitle}>계정 정보를 확인하고 관리하세요</p>
        </div>
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>로딩 중...</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className={styles.userInfoSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 정보</h2>
          <p className={styles.sectionSubtitle}>계정 정보를 확인하고 관리하세요</p>
        </div>
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>로딩 중...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.userInfoSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 정보</h2>
          <p className={styles.sectionSubtitle}>계정 정보를 확인하고 관리하세요</p>
        </div>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>
            사용자 정보를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className={styles.userInfoSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>내 정보</h2>
          <p className={styles.sectionSubtitle}>계정 정보를 확인하고 관리하세요</p>
        </div>
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>사용자 정보가 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.userInfoSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>내 정보</h2>
        <p className={styles.sectionSubtitle}>계정 정보를 확인하고 관리하세요</p>
      </div>

      <div className={styles.userInfoContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImageWrapper}>
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={80}
                  height={80}
                  className={styles.profileImage}
                  unoptimized
                />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.profileInfo}>
              <h3 className={styles.userName}>{user.name}</h3>
              {user.email && (
                <p className={styles.userEmail}>{user.email}</p>
              )}
            </div>
          </div>

          <div className={styles.pointCard}>
            <div className={styles.pointLabel}>현재 포인트</div>
            <div className={styles.pointAmount}>{formatPrice(pointAmount)}</div>
          </div>
        </div>

        <div className={styles.passwordChangeWrapper}>
          <PasswordChange hideSectionHeader={true} />
        </div>
      </div>
    </section>
  );
}

