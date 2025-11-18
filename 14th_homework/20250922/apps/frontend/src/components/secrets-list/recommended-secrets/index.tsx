"use client";

import React, { useCallback, memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Secret } from "../types";
import styles from "./styles.module.css";

interface RecommendedSecretsProps {
  secrets: Secret[];
}

function RecommendedSecrets({ secrets }: RecommendedSecretsProps) {
  const formatPrice = useCallback((price: number) => {
    return `₩${price.toLocaleString()}`;
  }, []);

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

  return (
    <section className={styles.recommendedSecretsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerTexts}>
          <h2 className={styles.sectionTitle}>🕵️ 당신이 알고 싶을만한 비밀들</h2>
          <p className={styles.sectionSubtitle}>당신의 취향을 분석한 맞춤 추천</p>
        </div>
        <Link href="/secrets/new" className={styles.ctaButton}>
          비밀 판매하기
        </Link>
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
                <div className={styles.blurOverlay} />
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{secret.title}</h3>
              <p className={styles.desc}>{secret.desc}</p>
              <div className={styles.priceContainer}>
                <span className={styles.price}>{formatPrice(secret.price)}</span>
              </div>
              <div className={styles.hoverText}>🔍 더 알아보기</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default memo(RecommendedSecrets);

