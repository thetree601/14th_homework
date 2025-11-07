"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../mutations";
import styles from "./SignUpModal.module.css";

interface SignUpModalProps {
	onCancel: () => void;
	onSuccess?: () => void;
}

export default function SignUpModal({ onCancel, onSuccess }: SignUpModalProps) {
	const [createUser] = useMutation(CREATE_USER);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email.trim() || !password.trim() || !name.trim()) {
			setError("모든 필드를 입력해주세요.");
			return;
		}

		if (password.length < 6) {
			setError("비밀번호는 최소 6자 이상이어야 합니다.");
			return;
		}

		setIsLoading(true);

		try {
			const result = await createUser({
				variables: {
					createUserInput: {
						email: email.trim(),
						password: password.trim(),
						name: name.trim(),
					},
				},
			});

			if (result.data?.createUser) {
				alert("회원가입이 완료되었습니다!");
				onSuccess?.();
				onCancel();
			} else {
				setError("회원가입에 실패했습니다. 다시 시도해주세요.");
			}
		} catch (error: any) {
			console.error("회원가입 실패:", error);
			const errorMessage =
				error.graphQLErrors?.[0]?.message ||
				error.message ||
				"회원가입에 실패했습니다. 다시 시도해주세요.";
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.modalContent}>
			<h2 className={styles.title}>회원가입</h2>
			<p className={styles.message}>새 계정을 만들어주세요</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.fieldGroup}>
					<label className={styles.label}>이름</label>
					<input
						type="text"
						className={styles.input}
						placeholder="이름을 입력하세요"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isLoading}
						required
					/>
				</div>

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
						placeholder="비밀번호를 입력하세요 (최소 6자)"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isLoading}
						required
						minLength={6}
					/>
				</div>

				{error && <div className={styles.error}>{error}</div>}

				<div className={styles.buttons}>
					<button
						type="submit"
						className={styles.submitButton}
						disabled={isLoading}
					>
						{isLoading ? "가입 중..." : "회원가입"}
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
			</form>
		</div>
	);
}

