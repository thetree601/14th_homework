"use client";

import React, { useState, useEffect } from "react";
import styles from "./SecretComments.module.css";
import QuestionForm from "./QuestionForm";
import QuestionsList from "./QuestionsList";
import { createQuestion, updateQuestion, deleteQuestion, Question } from "./mutations";

interface SecretCommentsProps {
	secretId: string;
	questions?: Question[];
}

export default function SecretComments({ secretId, questions = [] }: SecretCommentsProps) {
	const [localQuestions, setLocalQuestions] = useState<Question[]>(questions);
	const [showForm, setShowForm] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLocalQuestions(questions);
	}, [questions]);

	const handleQuestionSubmit = async (content: string) => {
		setError(null);
		const result = await createQuestion(secretId, content);
		
		if (result.success) {
			const newQuestion: Question = {
				id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
				content: content.trim(),
				createdAt: new Date().toISOString(),
			};
			setLocalQuestions((prev) => [...prev, newQuestion]);
			setShowForm(false);
		} else {
			setError(result.error || "문의 등록에 실패했습니다.");
		}
	};

	const handleQuestionEdit = async (questionId: string, newContent: string) => {
		setError(null);
		const result = await updateQuestion(secretId, questionId, newContent);
		
		if (result.success) {
			setLocalQuestions((prev) =>
				prev.map((q) =>
					q.id === questionId ? { ...q, content: newContent.trim() } : q
				)
			);
		} else {
			setError(result.error || "문의 수정에 실패했습니다.");
			throw new Error(result.error || "문의 수정에 실패했습니다.");
		}
	};

	const handleQuestionDelete = async (questionId: string) => {
		setError(null);
		const result = await deleteQuestion(secretId, questionId);
		
		if (result.success) {
			setLocalQuestions((prev) => prev.filter((q) => q.id !== questionId));
		} else {
			setError(result.error || "문의 삭제에 실패했습니다.");
			throw new Error(result.error || "문의 삭제에 실패했습니다.");
		}
	};

	const sortedQuestions = [...localQuestions].sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});

	return (
		<section className={styles.comments} data-testid="secret-comments">
			<h3 className={styles.title}>문의하기 · 댓글</h3>
			<QuestionsList 
				questions={sortedQuestions}
				onEdit={handleQuestionEdit}
				onDelete={handleQuestionDelete}
			/>
			{error && (
				<div className={styles.errorMessage} data-testid="question-error-message">
					{error}
				</div>
			)}
			{showForm ? (
				<QuestionForm
					onSubmit={handleQuestionSubmit}
					onCancel={() => {
						setShowForm(false);
						setError(null);
					}}
				/>
			) : (
				<button
					type="button"
					className={styles.inquiryBtn}
					onClick={() => setShowForm(true)}
					data-testid="comments-inquiry-button"
				>
					문의하기
				</button>
			)}
		</section>
	);
}


