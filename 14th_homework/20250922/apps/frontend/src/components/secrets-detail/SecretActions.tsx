"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { authManager } from "@/lib/auth";
import { FETCH_USER_LOGGED_IN } from "@/commons/layout/navigation/queries";
import PurchaseConfirmModal from "./modals/PurchaseConfirmModal";
import InsufficientPointsModal from "./modals/InsufficientPointsModal";
import ChargePointsModal from "./modals/ChargePointsModal";
import LoginModal from "@/components/secrets-list/modals/LoginModal";
import styles from "./SecretActions.module.css";

export default function SecretActions({ price }: { price: number }) {
	const { openModal, closeModal } = useModal();
	const { data } = useQuery(FETCH_USER_LOGGED_IN, {
		skip: !authManager.isLoggedIn(),
		errorPolicy: 'ignore'
	});

	const userPoint = data?.fetchUserLoggedIn?.userPoint?.amount || 0;

	const handleBuyClick = () => {
		// 로그인 상태 확인
		authManager.initializeToken();
		if (!authManager.isLoggedIn()) {
			openModal(
				<LoginModal
					onCancel={closeModal}
					onSuccess={() => {
						closeModal();
						window.location.reload();
					}}
				/>
			);
			return;
		}

		if (userPoint < price) {
			// 포인트 부족 모달 표시
			openModal(
				<InsufficientPointsModal
					requiredPoints={price}
					currentPoints={userPoint}
					onCharge={() => {
						closeModal();
						// 포인트 충전 모달 표시
						openModal(
							<ChargePointsModal
								onCancel={closeModal}
								onSuccess={() => {
									// 포인트 충전 성공 후 사용자 포인트 정보 갱신
									// Apollo Client의 refetchQueries로 자동 갱신됨
								}}
							/>
						);
					}}
					onCancel={closeModal}
				/>
			);
		} else {
			// 구매 확인 모달 표시
			openModal(
				<PurchaseConfirmModal
					price={price}
					onConfirm={() => {
						console.log("구매 확인:", price);
						// TODO: 실제 구매 API 호출
						closeModal();
					}}
					onCancel={closeModal}
				/>
			);
		}
	};

	return (
		<section className={styles.actions} data-testid="secret-actions">
			<div className={styles.priceRow}>
				<span className={styles.priceLabel}>판매 가격</span>
				<strong className={styles.priceValue}>{price.toLocaleString()}원</strong>
			</div>
			<div className={styles.buttons}>
				<button
					type="button"
					className={styles.buyButton}
					data-testid="buy-button"
					onClick={handleBuyClick}
				>
					구매 하기
				</button>
				<button type="button" className={styles.inquiryButton} data-testid="inquiry-button">
					문의하기
				</button>
			</div>
		</section>
	);
}


