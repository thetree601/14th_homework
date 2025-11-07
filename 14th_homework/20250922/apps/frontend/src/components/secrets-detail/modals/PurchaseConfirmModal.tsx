"use client";

import React from "react";
import styles from "./PurchaseConfirmModal.module.css";

interface PurchaseConfirmModalProps {
	price: number;
	onConfirm: () => void;
	onCancel: () => void;
}

export default function PurchaseConfirmModal({
	price,
	onConfirm,
	onCancel,
}: PurchaseConfirmModalProps) {
	return (
		<div className={styles.modalContent}>
			<h2 className={styles.title}>구매 확인</h2>
			<p className={styles.message}>이 비밀을 구매하시겠습니까?</p>
			<div className={styles.priceInfo}>
				<span className={styles.priceLabel}>구매 가격</span>
				<strong className={styles.priceValue}>{price.toLocaleString()}원</strong>
			</div>
			<div className={styles.buttons}>
				<button type="button" className={styles.confirmButton} onClick={onConfirm}>
					구매하기
				</button>
				<button type="button" className={styles.cancelButton} onClick={onCancel}>
					취소
				</button>
			</div>
		</div>
	);
}

