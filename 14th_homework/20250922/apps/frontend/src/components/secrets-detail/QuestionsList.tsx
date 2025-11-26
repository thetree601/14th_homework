"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./QuestionsList.module.css";
import { Question } from "./mutations";

interface QuestionsListProps {
	questions: Question[];
	onEdit?: (questionId: string, newContent: string) => Promise<void>;
	onDelete?: (questionId: string) => Promise<void>;
}

function formatRelativeTime(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return "방금 전";
	} else if (diffInSeconds < 3600) {
		const minutes = Math.floor(diffInSeconds / 60);
		return `${minutes}분 전`;
	} else if (diffInSeconds < 86400) {
		const hours = Math.floor(diffInSeconds / 3600);
		return `${hours}시간 전`;
	} else if (diffInSeconds < 2592000) {
		const days = Math.floor(diffInSeconds / 86400);
		return `${days}일 전`;
	} else {
		return date.toLocaleDateString("ko-KR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}
}

export default function QuestionsList({ 
	questions, 
	onEdit, 
	onDelete 
}: QuestionsListProps) {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editContent, setEditContent] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleEditClick = (question: Question) => {
		setEditingId(question.id);
		setEditContent(question.content);
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditContent("");
	};

	const handleSaveEdit = async (questionId: string) => {
		if (!onEdit) return;
		
		setIsSubmitting(true);
		try {
			await onEdit(questionId, editContent);
			setEditingId(null);
			setEditContent("");
		} catch (error) {
			console.error("수정 중 오류:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteClick = async (questionId: string) => {
		if (!onDelete) return;
		
		const confirmed = window.confirm("정말 삭제하시겠습니까?");
		if (confirmed) {
			try {
				await onDelete(questionId);
			} catch (error) {
				console.error("삭제 중 오류:", error);
			}
		}
	};

	if (questions.length === 0) {
		return (
			<div className={styles.empty} data-testid="questions-empty">
				<p className={styles.emptyText}>아직 문의가 없습니다.</p>
			</div>
		);
	}

	return (
		<div className={styles.list} data-testid="questions-list">
			{questions.map((question) => (
				<div key={question.id} className={styles.item} data-testid={`question-${question.id}`}>
					{editingId === question.id ? (
						// 수정 모드
						<div className={styles.editMode}>
							<textarea
								className={styles.editTextarea}
								value={editContent}
								onChange={(e) => setEditContent(e.target.value)}
								rows={3}
								data-testid={`question-edit-textarea-${question.id}`}
							/>
							<div className={styles.editActions}>
								<button
									type="button"
									className={styles.cancelBtn}
									onClick={handleCancelEdit}
									data-testid={`question-cancel-edit-${question.id}`}
								>
									취소
								</button>
								<button
									type="button"
									className={styles.saveBtn}
									onClick={() => handleSaveEdit(question.id)}
									disabled={isSubmitting || !editContent.trim()}
									data-testid={`question-save-edit-${question.id}`}
								>
									{isSubmitting ? "저장 중..." : "저장"}
								</button>
							</div>
						</div>
					) : (
						// 일반 모드
						<>
							<div className={styles.content}>{question.content}</div>
							<div className={styles.footer}>
								<div className={styles.time}>{formatRelativeTime(question.createdAt)}</div>
								<div className={styles.actions}>
									{onEdit && (
										<button
											type="button"
											className={styles.actionBtn}
											onClick={() => handleEditClick(question)}
											data-testid={`question-edit-button-${question.id}`}
											aria-label="수정"
										>
											<Image
												src="/images/edit.png"
												alt="수정"
												width={16}
												height={16}
											/>
										</button>
									)}
									{onDelete && (
										<button
											type="button"
											className={styles.actionBtn}
											onClick={() => handleDeleteClick(question.id)}
											data-testid={`question-delete-button-${question.id}`}
											aria-label="삭제"
										>
											<Image
												src="/images/delete2.png"
												alt="삭제"
												width={16}
												height={16}
											/>
										</button>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			))}
		</div>
	);
}

