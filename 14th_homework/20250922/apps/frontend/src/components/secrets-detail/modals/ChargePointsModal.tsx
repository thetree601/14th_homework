"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
// @ts-ignore - 포트원 SDK 타입 정의 문제로 임시 처리
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 } from "uuid";
import { authManager } from "@/lib/auth";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "../mutations";
import styles from "./ChargePointsModal.module.css";

interface ChargePointsModalProps {
	onCancel: () => void;
	onSuccess?: () => void;
}

const CHARGE_AMOUNTS = [5000, 10000, 30000, 50000, 100000];
// 테스트 결제용 스토어 ID 및 채널키 (실제 결제가 발생하지 않음)
const STORE_ID = "store-abc39db7-8ee1-4898-919e-0af603a68317";
const CHANNEL_KEY = "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33";

export default function ChargePointsModal({
	onCancel,
	onSuccess,
}: ChargePointsModalProps) {
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [customAmount, setCustomAmount] = useState<string>("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [createPointTransaction] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

	const handleConfirm = async () => {
		// 로그인 상태 확인
		authManager.initializeToken();
		const isLoggedIn = authManager.isLoggedIn();
		const token = authManager.getToken();
		
		console.log("로그인 상태 확인:", {
			isLoggedIn,
			hasToken: !!token,
			tokenLength: token?.length || 0,
		});
		
		if (!isLoggedIn) {
			alert("로그인이 필요합니다. 먼저 로그인해주세요.");
			return;
		}
		
		const amount = selectedAmount || parseInt(customAmount);
		if (!amount || amount <= 0) {
			alert("충전할 금액을 선택하거나 입력해주세요.");
			return;
		}

		setIsProcessing(true);

		// 수업 코드처럼 uuid를 사용하여 paymentId 생성
		const paymentId = `payment-${v4()}`;

		try {
			// 포트원 테스트 결제 요청
			// 주의: 제공된 스토어 ID와 채널키는 테스트용이며, 실제 결제가 발생하지 않습니다.
			const paymentResponse = await PortOne.requestPayment({
				storeId: STORE_ID,
				channelKey: CHANNEL_KEY,
				paymentId: paymentId,
				orderName: `포인트 충전 ${amount.toLocaleString()}원 (테스트)`,
				totalAmount: amount,
				currency: "CURRENCY_KRW",
				payMethod: "EASY_PAY", // 카카오페이는 EASY_PAY로 처리
				customer: {
					fullName: "고객",
				},
				redirectUrl: typeof window !== 'undefined' ? window.location.href : undefined, // 모바일 결제시, 결제 후 다시 돌아올 내 홈페이지 주소
			});

			// 포트원 SDK v2 응답 구조 확인
			// 응답 구조: { paymentId, transactionType, txId }
			if (paymentResponse && paymentResponse.paymentId) {
				// transactionType이 'PAYMENT'이면 결제 성공
				if (paymentResponse.transactionType === "PAYMENT") {
					// 결제 성공 시 포인트 충전 뮤테이션 호출
					// 포트원 SDK v2 응답 구조:
					// - txId: 결제 시도 ID (요청마다 고유하게 생성)
					// - paymentId: 결제 ID
					// 백엔드가 포트원 API에서 조회할 때는 imp_uid가 필요한데,
					// 포트원 API 문서에 따르면 imp_uid는 txId와 동일할 수 있습니다.
					// 하지만 백엔드가 paymentId를 받아서 내부적으로 처리할 수도 있으므로,
					// 일단 paymentId를 사용하고, 안 되면 txId를 시도합니다.
					
					console.log("=== 포트원 결제 응답 분석 ===");
					console.log("전체 응답:", JSON.stringify(paymentResponse, null, 2));
					
					// 선생님 예제 코드에 따르면 response.paymentId를 사용해야 함
					// paymentId는 우리가 생성한 "payment-${v4()}" 값
					const successPaymentId = paymentResponse.paymentId;
					
					console.log("txId (결제 시도 ID):", paymentResponse.txId);
					console.log("paymentId (결제 ID):", paymentResponse.paymentId);
					console.log("백엔드에 전달할 paymentId:", successPaymentId);
					
					if (!successPaymentId) {
						console.error("결제 ID를 찾을 수 없습니다. 포트원 응답:", paymentResponse);
						alert("결제 정보를 확인할 수 없습니다. 다시 시도해주세요.");
						setIsProcessing(false);
						return;
					}
					
					try {
						// 정확한 원인 파악을 위한 상세 로깅
						console.log("=== 뮤테이션 호출 전 ===");
						console.log("전달할 paymentId 값:", successPaymentId);
						console.log("전달할 paymentId 타입:", typeof successPaymentId);
						console.log("전달할 paymentId 길이:", successPaymentId?.length);
						console.log("전체 포트원 응답:", JSON.stringify(paymentResponse, null, 2));
						
						// 토큰 확인 로그 추가
						authManager.initializeToken();
						const currentToken = authManager.getToken();
						console.log("현재 토큰 상태:", {
							hasToken: !!currentToken,
							tokenLength: currentToken?.length || 0,
							tokenPreview: currentToken ? `${currentToken.substring(0, 20)}...` : '없음'
						});
						
						const result = await createPointTransaction({
							variables: {
								paymentId: successPaymentId,
							},
							refetchQueries: ["fetchUserLoggedIn"],
						});
						
						console.log("=== 뮤테이션 응답 ===");
						console.log("전체 응답:", JSON.stringify(result, null, 2));

						if (result.data?.createPointTransactionOfLoading) {
							alert("포인트 충전이 완료되었습니다!");
							onSuccess?.();
							onCancel();
						} else {
							console.error("포인트 충전 응답이 null입니다:", result);
							alert("포인트 충전 응답을 받을 수 없습니다. 관리자에게 문의해주세요.");
						}
					} catch (error: any) {
						console.error("포인트 충전 실패:", error);
						console.error("에러 상세:", {
							message: error.message,
							graphQLErrors: error.graphQLErrors,
							networkError: error.networkError,
						});
						
						// GraphQL 에러 메시지 상세 출력
						if (error.graphQLErrors && error.graphQLErrors.length > 0) {
							console.error("GraphQL 에러 상세:", error.graphQLErrors);
							error.graphQLErrors.forEach((gqlError: any, index: number) => {
								console.error(`GraphQL 에러 ${index + 1}:`, {
									message: gqlError.message,
									extensions: gqlError.extensions,
									path: gqlError.path,
								});
							});
						}
						
						// GraphQL 에러 메시지 추출
						const errorMessage = 
							error.graphQLErrors?.[0]?.message || 
							error.networkError?.message || 
							error.message || 
							"알 수 없는 오류";
						
						// 404 에러인 경우 테스트 모드 안내
						if (errorMessage.includes("404") || errorMessage.includes("Request failed with status code 404")) {
							const testModeMessage = 
								"⚠️ 테스트 결제 모드 제한\n\n" +
								"현재 테스트 결제 모드를 사용 중입니다. 테스트 결제는 실제 포트원 서버에 저장되지 않아 " +
								"백엔드에서 결제 정보를 조회할 수 없습니다.\n\n" +
								"해결 방법:\n" +
								"1. 백엔드에서 테스트 모드 지원 추가\n" +
								"2. 실제 포트원 API 키 사용 (실제 결제 발생)\n\n" +
								"개발 환경에서는 이 에러가 정상적으로 발생할 수 있습니다.";
							
							alert(testModeMessage);
							console.warn("테스트 결제 모드 제한:", {
								paymentId: successPaymentId,
								amount: amount,
								note: "백엔드가 포트원 API에서 결제 정보를 조회할 수 없음 (테스트 결제는 서버에 저장되지 않음)"
							});
						} else {
							alert(`포인트 충전 중 오류가 발생했습니다: ${errorMessage}`);
						}
					}
				} else {
					// 결제 실패 또는 취소
					console.log("결제가 취소되었거나 실패했습니다:", paymentResponse);
					alert("결제가 완료되지 않았습니다. 다시 시도해주세요.");
				}
			} else {
				// 응답 구조가 예상과 다른 경우
				console.error("예상하지 못한 결제 응답:", paymentResponse);
				alert("결제 응답을 처리할 수 없습니다. 다시 시도해주세요.");
			}
		} catch (error) {
			console.error("결제 요청 실패:", error);
			alert("결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className={styles.modalContent}>
			<h2 className={styles.title}>포인트 충전</h2>
			<p className={styles.message}>충전할 포인트를 선택해주세요</p>
			<div className={styles.testNotice}>
				⚠️ 테스트 결제 모드입니다. 실제 결제가 발생하지 않습니다.
			</div>
			
			<div className={styles.amountGrid}>
				{CHARGE_AMOUNTS.map((amount) => (
					<button
						key={amount}
						type="button"
						className={`${styles.amountButton} ${
							selectedAmount === amount ? styles.selected : ""
						}`}
						onClick={() => {
							setSelectedAmount(amount);
							setCustomAmount("");
						}}
						disabled={isProcessing}
					>
						{amount.toLocaleString()}원
					</button>
				))}
			</div>

			<div className={styles.customInput}>
				<label className={styles.label}>직접 입력</label>
				<input
					type="number"
					className={styles.input}
					placeholder="금액을 입력하세요"
					value={customAmount}
					onChange={(e) => {
						setCustomAmount(e.target.value);
						setSelectedAmount(null);
					}}
					min="1"
					disabled={isProcessing}
				/>
			</div>

			<div className={styles.buttons}>
				<button
					type="button"
					className={styles.confirmButton}
					onClick={handleConfirm}
					disabled={isProcessing}
				>
					{isProcessing ? "처리 중..." : "충전하기"}
				</button>
				<button
					type="button"
					className={styles.cancelButton}
					onClick={onCancel}
					disabled={isProcessing}
				>
					취소
				</button>
			</div>
		</div>
	);
}

