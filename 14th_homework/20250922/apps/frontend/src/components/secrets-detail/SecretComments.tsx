"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./SecretComments.module.css";
import QuestionForm from "./QuestionForm";
import QuestionsList from "./QuestionsList";
import { createQuestion, updateQuestion, deleteQuestion, createAnswer, updateAnswer, deleteAnswer, Question, Answer } from "./mutations";

interface SecretCommentsProps {
	secretId: string;
	questions?: Question[];
	answers?: Answer[];
}

export default function SecretComments({ secretId, questions = [], answers = [] }: SecretCommentsProps) {
	const [localQuestions, setLocalQuestions] = useState<Question[]>(questions);
	const [localAnswers, setLocalAnswers] = useState<Answer[]>(answers);
	const [showForm, setShowForm] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setLocalQuestions(questions);
	}, [questions]);

	useEffect(() => {
		setLocalAnswers(answers);
	}, [answers]);

	// answers를 questionId별로 그룹화
	const answersByQuestionId = useMemo(() => {
		const grouped: Record<string, Answer[]> = {};
		localAnswers.forEach(answer => {
			if (!grouped[answer.questionId]) {
				grouped[answer.questionId] = [];
			}
			grouped[answer.questionId].push(answer);
		});
		return grouped;
	}, [localAnswers]);

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

	const handleAnswerSubmit = async (questionId: string, content: string) => {
		setError(null);
		const result = await createAnswer(secretId, questionId, content);
		
		if (result.success) {
			const newAnswer: Answer = {
				id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
				questionId: questionId,
				content: content.trim(),
				createdAt: new Date().toISOString(),
			};
			setLocalAnswers((prev) => [...prev, newAnswer]);
		} else {
			setError(result.error || "답변 등록에 실패했습니다.");
			throw new Error(result.error || "답변 등록에 실패했습니다.");
		}
	};

	const handleAnswerEdit = async (answerId: string, newContent: string) => {
		setError(null);
		const result = await updateAnswer(secretId, answerId, newContent);
		
		if (result.success) {
			setLocalAnswers((prev) =>
				prev.map((a) =>
					a.id === answerId ? { ...a, content: newContent.trim() } : a
				)
			);
		} else {
			setError(result.error || "답변 수정에 실패했습니다.");
			throw new Error(result.error || "답변 수정에 실패했습니다.");
		}
	};

	const handleAnswerDelete = async (answerId: string) => {
		setError(null);
		const result = await deleteAnswer(secretId, answerId);
		
		if (result.success) {
			setLocalAnswers((prev) => prev.filter((a) => a.id !== answerId));
		} else {
			setError(result.error || "답변 삭제에 실패했습니다.");
			throw new Error(result.error || "답변 삭제에 실패했습니다.");
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
				answers={answersByQuestionId}
				onEdit={handleQuestionEdit}
				onDelete={handleQuestionDelete}
				onAnswerSubmit={handleAnswerSubmit}
				onAnswerEdit={handleAnswerEdit}
				onAnswerDelete={handleAnswerDelete}
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


