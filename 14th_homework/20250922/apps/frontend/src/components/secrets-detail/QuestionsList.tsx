"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./QuestionsList.module.css";
import { Question, Answer } from "./mutations";
import AnswerForm from "./AnswerForm";

interface QuestionsListProps {
	questions: Question[];
	answers?: Record<string, Answer[]>;
	onEdit?: (questionId: string, newContent: string) => Promise<void>;
	onDelete?: (questionId: string) => Promise<void>;
	onAnswerSubmit?: (questionId: string, content: string) => Promise<void>;
	onAnswerEdit?: (answerId: string, newContent: string) => Promise<void>;
	onAnswerDelete?: (answerId: string) => Promise<void>;
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
	answers = {},
	onEdit, 
	onDelete,
	onAnswerSubmit,
	onAnswerEdit,
	onAnswerDelete,
}: QuestionsListProps) {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editContent, setEditContent] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [answerFormQuestionId, setAnswerFormQuestionId] = useState<string | null>(null);
	const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
	const [editAnswerContent, setEditAnswerContent] = useState<string>("");
	const [isAnswerSubmitting, setIsAnswerSubmitting] = useState(false);

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

	const handleAnswerSubmit = async (questionId: string, content: string) => {
		if (!onAnswerSubmit) return;
		
		setIsAnswerSubmitting(true);
		try {
			await onAnswerSubmit(questionId, content);
			setAnswerFormQuestionId(null);
		} catch (error) {
			console.error("답변 등록 중 오류:", error);
		} finally {
			setIsAnswerSubmitting(false);
		}
	};

	const handleAnswerEditClick = (answer: Answer) => {
		setEditingAnswerId(answer.id);
		setEditAnswerContent(answer.content);
	};

	const handleAnswerCancelEdit = () => {
		setEditingAnswerId(null);
		setEditAnswerContent("");
	};

	const handleAnswerSaveEdit = async (answerId: string) => {
		if (!onAnswerEdit) return;
		
		setIsAnswerSubmitting(true);
		try {
			await onAnswerEdit(answerId, editAnswerContent);
			setEditingAnswerId(null);
			setEditAnswerContent("");
		} catch (error) {
			console.error("답변 수정 중 오류:", error);
		} finally {
			setIsAnswerSubmitting(false);
		}
	};

	const handleAnswerDeleteClick = async (answerId: string) => {
		if (!onAnswerDelete) return;
		
		const confirmed = window.confirm("정말 삭제하시겠습니까?");
		if (confirmed) {
			try {
				await onAnswerDelete(answerId);
			} catch (error) {
				console.error("답변 삭제 중 오류:", error);
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

	const getAnswersForQuestion = (questionId: string): Answer[] => {
		return answers[questionId] || [];
	};

	return (
		<div className={styles.list} data-testid="questions-list">
			{questions.map((question) => {
				const questionAnswers = getAnswersForQuestion(question.id);
				const sortedAnswers = [...questionAnswers].sort((a, b) => 
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);

				return (
					<div key={question.id} className={styles.questionWrapper}>
						<div className={styles.item} data-testid={`question-${question.id}`}>
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

						{/* 답변 목록 */}
						{editingId !== question.id && sortedAnswers.length > 0 && (
							<div className={styles.answersList}>
								{sortedAnswers.map((answer) => (
									<div key={answer.id} className={styles.answerItem} data-testid={`answer-${answer.id}`}>
										{editingAnswerId === answer.id ? (
											// 답변 수정 모드
											<div className={styles.answerEditMode}>
												<textarea
													className={styles.answerEditTextarea}
													value={editAnswerContent}
													onChange={(e) => setEditAnswerContent(e.target.value)}
													rows={3}
													data-testid={`answer-edit-textarea-${answer.id}`}
												/>
												<div className={styles.answerEditActions}>
													<button
														type="button"
														className={styles.cancelBtn}
														onClick={handleAnswerCancelEdit}
														data-testid={`answer-cancel-edit-${answer.id}`}
													>
														취소
													</button>
													<button
														type="button"
														className={styles.saveBtn}
														onClick={() => handleAnswerSaveEdit(answer.id)}
														disabled={isAnswerSubmitting || !editAnswerContent.trim()}
														data-testid={`answer-save-edit-${answer.id}`}
													>
														{isAnswerSubmitting ? "저장 중..." : "저장"}
													</button>
												</div>
											</div>
										) : (
											// 답변 일반 모드
											<>
												<div className={styles.answerContent}>{answer.content}</div>
												<div className={styles.answerFooter}>
													<div className={styles.answerTime}>{formatRelativeTime(answer.createdAt)}</div>
													<div className={styles.answerActions}>
														{onAnswerEdit && editingAnswerId === null && (
															<button
																type="button"
																className={styles.actionBtn}
																onClick={() => handleAnswerEditClick(answer)}
																data-testid={`answer-edit-button-${answer.id}`}
																aria-label="답변 수정"
															>
																<Image
																	src="/images/edit.png"
																	alt="수정"
																	width={16}
																	height={16}
																/>
															</button>
														)}
														{onAnswerDelete && editingAnswerId === null && (
															<button
																type="button"
																className={styles.actionBtn}
																onClick={() => handleAnswerDeleteClick(answer.id)}
																data-testid={`answer-delete-button-${answer.id}`}
																aria-label="답변 삭제"
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
						)}

						{/* 답변 작성 폼 */}
						{editingId !== question.id && answerFormQuestionId === question.id && (
							<div className={styles.answerFormWrapper}>
								<AnswerForm
									onSubmit={(content) => handleAnswerSubmit(question.id, content)}
									onCancel={() => setAnswerFormQuestionId(null)}
								/>
							</div>
						)}

						{/* 답변하기 버튼 */}
						{editingId !== question.id && answerFormQuestionId !== question.id && onAnswerSubmit && (
							<button
								type="button"
								className={styles.answerButton}
								onClick={() => setAnswerFormQuestionId(question.id)}
								data-testid={`answer-button-${question.id}`}
							>
								답변하기
							</button>
						)}
					</div>
				);
			})}
		</div>
	);
}

