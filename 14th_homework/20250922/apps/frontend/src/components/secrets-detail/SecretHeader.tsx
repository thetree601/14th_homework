"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { deleteSecret } from "@/components/secrets-list/mutations";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import styles from "./SecretHeader.module.css";

interface SecretHeaderProps {
	title: string;
	description: string;
	tags: string[];
	secretId: string;
	onDelete?: () => void;
}

export default function SecretHeader({
	title,
	description,
	tags,
	secretId,
	onDelete,
}: SecretHeaderProps) {
	const { openModal, closeModal } = useModal();
	const router = useRouter();

	const handleDeleteClick = () => {
		console.log("삭제 버튼 클릭됨, secretId:", secretId);
		openModal(
			<DeleteConfirmModal
				onConfirm={async () => {
					try {
						console.log("삭제 확인됨, 삭제 시작...");
						const result = await deleteSecret(secretId);
						console.log("삭제 결과:", result);
						
						if (result.success) {
							console.log("삭제 성공, 모달 닫고 목록 페이지로 이동");
							closeModal();
							// 삭제 성공 후 목록 페이지로 이동
							router.push("/secrets");
							// 페이지 새로고침을 통해 최신 데이터 반영
							router.refresh();
						} else {
							// 에러 처리
							console.error("삭제 실패:", result.error);
							alert(result.error || "비밀 삭제에 실패했습니다.");
						}
					} catch (error) {
						console.error("삭제 중 예외 발생:", error);
						alert("삭제 중 오류가 발생했습니다: " + (error instanceof Error ? error.message : String(error)));
					}
				}}
				onCancel={closeModal}
			/>
		);
	};

	return (
		<header className={styles.header} data-testid="secret-header">
			<div className={styles.headerTop}>
				<div className={styles.headerContent}>
					<h1 className={styles.title}>{title}</h1>
					<p className={styles.description}>{description}</p>
					<ul className={styles.tags} data-testid="secret-tags">
						{tags.map((tag) => (
							<li key={tag} className={styles.tagItem}>
								{tag}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.actions}>
					<Link
						href={`/secrets/${secretId}/edit`}
						className={styles.editButton}
						data-testid="secret-edit-button"
					>
						수정
					</Link>
					<button
						type="button"
						className={styles.deleteButton}
						onClick={handleDeleteClick}
						data-testid="secret-delete-button"
					>
						삭제
					</button>
				</div>
			</div>
		</header>
	);
}


