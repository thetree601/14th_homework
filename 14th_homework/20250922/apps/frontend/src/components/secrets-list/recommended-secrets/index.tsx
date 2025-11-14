"use client";

import React, { useCallback, memo } from "react";
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
          <Link key={secret.id} href={`/secrets/${secret.id}`} className={styles.secretCard}>
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

