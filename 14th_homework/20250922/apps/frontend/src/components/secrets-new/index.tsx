"use client";

import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function SecretsNew() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>비밀 등록하기</h1>
        <p className={styles.mainSubtitle}>메인 분위기와 동일한 톤으로 구성된 등록 폼</p>
      </div>

      <section className={styles.formSection}>
        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>비밀명</label>
            <input className={styles.input} placeholder="비밀의 제목을 입력하세요" />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>한줄 설명</label>
            <input className={styles.input} placeholder="간단한 설명을 입력하세요" />
          </div>

          <div className={styles.fieldGroupFull}>
            <label className={styles.label}>비밀 소개</label>
            <textarea className={styles.textarea} placeholder="이 비밀에 대해 자세히 소개해 주세요" />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>판매 가격</label>
              <input className={styles.input} placeholder="예: 10000" inputMode="numeric" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>태그 입력</label>
              <input className={styles.input} placeholder="쉼표(,)로 구분하여 입력" />
            </div>
          </div>

          <div className={styles.fieldGroupFull}>
            <label className={styles.label}>비밀과 관련된 주소</label>
            <div className={styles.addressRow}>
              <input className={styles.input} placeholder="주소" />
              <button className={styles.secondaryButton} type="button">주소 검색</button>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.labelSm}>우편번호</label>
                <input className={styles.input} placeholder="우편번호" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.labelSm}>상세 위치</label>
                <input className={styles.input} placeholder="상세 주소" />
              </div>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.labelSm}>위도 (LAT)</label>
                <input className={styles.input} placeholder="예: 37.5665" inputMode="decimal" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.labelSm}>경도 (LNG)</label>
                <input className={styles.input} placeholder="예: 126.9780" inputMode="decimal" />
              </div>
            </div>
          </div>

          <div className={styles.fieldGroupFull}>
            <label className={styles.label}>사진 첨부</label>
            <div className={styles.uploadBox} role="button">
              <span>클릭해서 사진 업로드</span>
              <input className={styles.fileInput} type="file" accept="image/*" />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/secrets" className={styles.ghostButton}>취소</Link>
          <button className={styles.primaryButton} type="button">등록하기</button>
        </div>
      </section>
    </div>
  );
}


