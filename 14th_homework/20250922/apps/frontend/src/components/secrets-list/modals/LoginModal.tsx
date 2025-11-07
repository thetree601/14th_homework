"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { authManager } from "@/lib/auth";
import { LOGIN_USER } from "../mutations";
import SignUpModal from "./SignUpModal";
import styles from "./LoginModal.module.css";

interface LoginModalProps {
	onCancel: () => void;
	onSuccess?: () => void;
}

export default function LoginModal({ onCancel, onSuccess }: LoginModalProps) {
	const { openModal, closeModal } = useModal();
	const [loginUser] = useMutation(LOGIN_USER);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email.trim() || !password.trim()) {
			setError("이메일과 비밀번호를 모두 입력해주세요.");
			return;
		}

		setIsLoading(true);

		try {
			const result = await loginUser({
				variables: {
					email: email.trim(),
					password: password.trim(),
				},
			});

			if (result.data?.loginUser?.accessToken) {
				const token = result.data.loginUser.accessToken;
				authManager.setToken(token);
				onSuccess?.();
				onCancel();
			} else {
				setError("로그인에 실패했습니다. 다시 시도해주세요.");
			}
		} catch (error: any) {
			console.error("로그인 실패:", error);
			const errorMessage =
				error.graphQLErrors?.[0]?.message ||
				error.message ||
				"로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.";
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignUpClick = () => {
		closeModal();
		openModal(
			<SignUpModal
				onCancel={() => {
					closeModal();
				}}
				onSuccess={() => {
					closeModal();
					// 회원가입 성공 후 로그인 모달 다시 열기
					openModal(
						<LoginModal
							onCancel={closeModal}
							onSuccess={onSuccess}
						/>
					);
				}}
			/>
		);
	};

	return (
		<div className={styles.modalContent}>
			<h2 className={styles.title}>로그인</h2>
			<p className={styles.message}>이메일과 비밀번호를 입력해주세요</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.fieldGroup}>
					<label className={styles.label}>이메일</label>
					<input
						type="email"
						className={styles.input}
						placeholder="이메일을 입력하세요"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isLoading}
						required
					/>
				</div>

				<div className={styles.fieldGroup}>
					<label className={styles.label}>비밀번호</label>
					<input
						type="password"
						className={styles.input}
						placeholder="비밀번호를 입력하세요"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isLoading}
						required
					/>
				</div>

				{error && <div className={styles.error}>{error}</div>}

				<div className={styles.buttons}>
					<button
						type="submit"
						className={styles.submitButton}
						disabled={isLoading}
					>
						{isLoading ? "로그인 중..." : "로그인"}
					</button>
					<button
						type="button"
						className={styles.cancelButton}
						onClick={onCancel}
						disabled={isLoading}
					>
						취소
					</button>
				</div>

				<div className={styles.signUpLink}>
					<button
						type="button"
						className={styles.signUpButton}
						onClick={handleSignUpClick}
						disabled={isLoading}
					>
						회원가입
					</button>
				</div>
			</form>
		</div>
	);
}

