"use client";

import React from "react";
import styles from "./InsufficientPointsModal.module.css";

interface InsufficientPointsModalProps {
	requiredPoints: number;
	currentPoints: number;
	onCharge: () => void;
	onCancel: () => void;
}

export default function InsufficientPointsModal({
	requiredPoints,
	currentPoints,
	onCharge,
	onCancel,
}: InsufficientPointsModalProps) {
	return (
		<div className={styles.modalContent}>
			<h2 className={styles.title}>포인트 부족</h2>
			<p className={styles.message}>포인트가 부족합니다</p>
			<div className={styles.pointsInfo}>
				<div className={styles.pointRow}>
					<span className={styles.pointLabel}>필요 포인트</span>
					<strong className={styles.pointValue}>{requiredPoints.toLocaleString()}원</strong>
				</div>
				<div className={styles.pointRow}>
					<span className={styles.pointLabel}>보유 포인트</span>
					<strong className={styles.currentPointValue}>{currentPoints.toLocaleString()}원</strong>
				</div>
				<div className={styles.pointRow}>
					<span className={styles.pointLabel}>부족 포인트</span>
					<strong className={styles.shortagePointValue}>
						{(requiredPoints - currentPoints).toLocaleString()}원
					</strong>
				</div>
			</div>
			<div className={styles.buttons}>
				<button type="button" className={styles.chargeButton} onClick={onCharge}>
					충전
				</button>
				<button type="button" className={styles.cancelButton} onClick={onCancel}>
					취소
				</button>
			</div>
		</div>
	);
}

