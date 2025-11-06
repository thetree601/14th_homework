"use client";

import React from "react";
import styles from "./SecretActions.module.css";

export default function SecretActions({ price }: { price: number }) {
	return (
		<section className={styles.actions} data-testid="secret-actions">
			<div className={styles.priceRow}>
				<span className={styles.priceLabel}>판매 가격</span>
				<strong className={styles.priceValue}>{price.toLocaleString()}원</strong>
			</div>
			<div className={styles.buttons}>
				<button type="button" className={styles.buyButton} data-testid="buy-button">
					구매 하기
				</button>
				<button type="button" className={styles.inquiryButton} data-testid="inquiry-button">
					문의하기
				</button>
			</div>
		</section>
	);
}


