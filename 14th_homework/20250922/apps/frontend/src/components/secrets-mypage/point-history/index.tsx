"use client";

import React, { useState } from "react";
import { pointChargeHistory, pointPurchaseHistory } from "./mockData";
import styles from "./styles.module.css";

export interface PointTransaction {
  id: number;
  amount: number;
  balance: number;
  createdAt: string;
  description?: string;
}

export default function PointHistory() {
  const [activeTab, setActiveTab] = useState<"charge" | "purchase">("charge");

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const currentHistory = activeTab === "charge" ? pointChargeHistory : pointPurchaseHistory;

  return (
    <section className={styles.pointHistorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>포인트 사용내역</h2>
        <p className={styles.sectionSubtitle}>충전 및 구매 내역을 확인하세요</p>
      </div>

      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === "charge" ? styles.active : ""}`}
          onClick={() => setActiveTab("charge")}
        >
          충전내역
        </button>
        <button
          className={`${styles.tab} ${activeTab === "purchase" ? styles.active : ""}`}
          onClick={() => setActiveTab("purchase")}
        >
          구매내역
        </button>
      </div>

      <div className={styles.historyContainer}>
        {currentHistory.length > 0 ? (
          <div className={styles.historyList}>
            {currentHistory.map((transaction) => (
              <div key={transaction.id} className={styles.historyItem}>
                <div className={styles.historyContent}>
                  <div className={styles.historyLeft}>
                    <h3 className={styles.historyTitle}>
                      {activeTab === "charge" ? "포인트 충전" : "비밀 구매"}
                    </h3>
                    {transaction.description && (
                      <p className={styles.historyDescription}>{transaction.description}</p>
                    )}
                    <p className={styles.historyDate}>{formatDate(transaction.createdAt)}</p>
                  </div>
                  <div className={styles.historyRight}>
                    <div className={styles.amountContainer}>
                      <span
                        className={`${styles.amount} ${
                          activeTab === "charge" ? styles.positive : styles.negative
                        }`}
                      >
                        {activeTab === "charge" ? "+" : "-"}
                        {formatPrice(transaction.amount)}
                      </span>
                      <span className={styles.balance}>
                        잔액: {formatPrice(transaction.balance)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              {activeTab === "charge"
                ? "충전 내역이 없습니다."
                : "구매 내역이 없습니다."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

