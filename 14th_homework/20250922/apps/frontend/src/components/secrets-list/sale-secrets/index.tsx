"use client";

import React, { useCallback, memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Secret } from "../types";
import { usePaymentSubscription } from "@/app/payments/hooks/index.payment.hook";
import styles from "./styles.module.css";

interface SaleSecretsProps {
  secrets: Secret[];
}

function SaleSecrets({ secrets }: SaleSecretsProps) {
  const { isProcessing, subscribe } = usePaymentSubscription();
  // 뷰포트에 보이는 카드의 ID를 추적하여 prefetch 제어
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Intersection Observer를 사용하여 뷰포트에 보이는 카드 감지
  useEffect(() => {
    // Observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const secretId = entry.target.getAttribute('data-secret-id');
            if (secretId) {
              setVisibleIds((prev) => new Set(prev).add(secretId));
            }
          }
        });
      },
      {
        rootMargin: '50px', // 뷰포트 기준 50px 전에 prefetch 시작
        threshold: 0.1,
      }
    );

    // 기존에 등록된 모든 카드에 observer 연결
    cardRefsRef.current.forEach((element) => {
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [secrets]);

  // ref callback에서 요소가 설정될 때 observer에 연결
  const setCardRef = useCallback((secretId: string, element: HTMLElement | null) => {
    if (element) {
      cardRefsRef.current.set(secretId, element);
      // observer가 생성되어 있으면 즉시 연결
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    } else {
      const existingElement = cardRefsRef.current.get(secretId);
      if (existingElement && observerRef.current) {
        observerRef.current.unobserve(existingElement);
      }
      cardRefsRef.current.delete(secretId);
    }
  }, []);

  const formatPrice = useCallback((price: number) => {
    return `₩${price.toLocaleString()}`;
  }, []);

  const handleSubscribe = useCallback(async () => {
    console.log("구독하기 버튼 클릭됨");
    try {
      await subscribe("구독 결제", 10000);
    } catch (error) {
      console.error("구독하기 처리 중 오류:", error);
    }
  }, [subscribe]);

  return (
    <section className={styles.saleSecretsSection}>
      <div className={styles.sectionHeader}>
        <button 
          className={styles.subscribeButton}
          onClick={handleSubscribe}
          disabled={isProcessing}
          type="button"
        >
          {isProcessing ? "처리 중..." : "구독하기"}
        </button>
        <div className={styles.headerContent}>
          <span className={styles.timerIcon}>⏰</span>
          <h2 className={styles.sectionTitle}>막판 할인 이벤트</h2>
        </div>
        <p className={styles.sectionSubtitle}>이 비밀은 곧 사라집니다.</p>
      </div>

      <div className={styles.secretsGrid}>
        {secrets.map((secret) => (
          <Link 
            key={secret.id} 
            href={`/secrets/${secret.id}`}
            prefetch={visibleIds.has(secret.id)}
            data-secret-id={secret.id}
            ref={(el) => setCardRef(secret.id, el)}
            className={styles.secretCard}
          >
            <div className={styles.imageWrapper}>
              {secret.img ? (
                <Image
                  src={secret.img}
                  alt={secret.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized
                />
              ) : (
                <div className={styles.imagePlaceholder}>이미지 없음</div>
              )}
              <div className={styles.overlay}>
                <div className={styles.timeBadge}>
                  <span className={styles.timeIcon}>⏰</span>
                  <span className={styles.timeText}>{secret.saleEnds}</span>
                </div>
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{secret.title}</h3>
              <p className={styles.desc}>{secret.desc}</p>
              <div className={styles.priceContainer}>
                <span className={styles.price}>{formatPrice(secret.price)}</span>
              </div>
              <div className={styles.hoverText}>🔍 비밀의 조각 보기</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default memo(SaleSecrets);

