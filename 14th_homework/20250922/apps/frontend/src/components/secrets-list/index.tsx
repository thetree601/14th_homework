"use client";

import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { authManager } from "@/lib/auth";
import { FETCH_USER_LOGGED_IN } from "@/commons/layout/navigation/queries";
import HotSecrets from "./hot-secrets";
import SaleSecrets from "./sale-secrets";
import RecommendedSecrets from "./recommended-secrets";
import LoginModal from "./modals/LoginModal";
import SecretsPageHeader from "./secrets-page-header";
import AuthButton from "./auth-button";
import LoadingSection from "./loading-section";
import { useSecretsData } from "./hooks/use-secrets-data";
import styles from "./styles.module.css";

export default function SecretsListPage() {
  const { openModal, closeModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const hasOpenedModalRef = useRef(false);
  
  // 데이터 페칭 훅 사용
  const { hotSecrets, saleSecrets, recommendedSecrets, loadingHot, loadingSale, loadingRecommended } = useSecretsData();

  useEffect(() => {
    authManager.initializeToken();
    setIsLoggedIn(authManager.isLoggedIn());
  }, []);

  const [shouldSkipQuery, setShouldSkipQuery] = useState(!authManager.isLoggedIn());

  const { error, refetch } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: shouldSkipQuery,
    errorPolicy: 'ignore',
    onCompleted: () => {
      setIsLoggedIn(true);
      hasOpenedModalRef.current = false; // 로그인 성공 시 리셋
    },
    onError: (error) => {
      setIsLoggedIn(false);
      // 토큰 만료 에러인 경우 토큰 제거
      if (error.graphQLErrors?.some(
        (err) => err.extensions?.code === 'UNAUTHENTICATED' || err.message.includes('토큰 만료')
      )) {
        authManager.clearToken();
        setShouldSkipQuery(true);
      }
    }
  });

  // 토큰 상태 변경 감지
  useEffect(() => {
    const isLoggedIn = authManager.isLoggedIn();
    setShouldSkipQuery(!isLoggedIn);
  }, []);

  // 토큰 만료 에러가 발생하면 로그인 모달 자동 열기
  useEffect(() => {
    const hasAuthError = error?.graphQLErrors?.some(
      (err) => err.extensions?.code === 'UNAUTHENTICATED' || err.message.includes('토큰 만료')
    );

    if (hasAuthError && !isLoggedIn && !hasOpenedModalRef.current) {
      hasOpenedModalRef.current = true;
      openModal(
        <LoginModal
          onCancel={() => {
            closeModal();
            hasOpenedModalRef.current = false;
          }}
          onSuccess={async () => {
            // 로그인 성공 후 토큰이 저장되었으므로 쿼리 다시 실행
            setShouldSkipQuery(false);
            if (authManager.isLoggedIn()) {
              try {
                await refetch();
                setIsLoggedIn(true);
              } catch (err) {
                console.error('사용자 정보 조회 실패:', err);
              }
            }
            closeModal();
            hasOpenedModalRef.current = false;
          }}
        />
      );
    }
  }, [error, isLoggedIn, openModal, closeModal, refetch]);

  const handleLoginSuccess = async () => {
    // 로그인 성공 후 토큰이 저장되었으므로 쿼리 다시 실행
    setShouldSkipQuery(false);
    if (authManager.isLoggedIn()) {
      try {
        await refetch();
        setIsLoggedIn(true);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <SecretsPageHeader
        title="who's Secret"
        subtitle="누구나 알고 싶지만, 아무도 말하지 않는 이야기들."
        authButton={
          <AuthButton
            isLoggedIn={isLoggedIn}
            onLoginSuccess={handleLoginSuccess}
          />
        }
      />

      <LoadingSection isLoading={loadingHot}>
        <HotSecrets secrets={hotSecrets} />
      </LoadingSection>
      
      <LoadingSection isLoading={loadingSale} loadingMessage="할인 상품 로딩 중...">
        <SaleSecrets secrets={saleSecrets} />
      </LoadingSection>
      
      <LoadingSection isLoading={loadingRecommended} loadingMessage="추천 상품 로딩 중...">
        <RecommendedSecrets secrets={recommendedSecrets} />
      </LoadingSection>
    </div>
  );
}

