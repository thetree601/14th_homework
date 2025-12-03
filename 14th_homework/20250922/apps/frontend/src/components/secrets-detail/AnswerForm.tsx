"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./AnswerForm.module.css";

const answerSchema = z.object({
	content: z.string().min(1, "답변 내용을 입력해주세요.").max(1000, "답변 내용은 1000자 이하로 입력해주세요."),
});

type AnswerFormData = z.infer<typeof answerSchema>;

interface AnswerFormProps {
	onSubmit: (content: string) => Promise<void>;
	onCancel: () => void;
}

export default function AnswerForm({ onSubmit, onCancel }: AnswerFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AnswerFormData>({
		resolver: zodResolver(answerSchema),
	});

	const handleFormSubmit = async (data: AnswerFormData) => {
		setIsSubmitting(true);
		try {
			await onSubmit(data.content);
			reset();
		} catch (error) {
			console.error("답변 등록 중 오류:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} data-testid="answer-form">
			<textarea
				{...register("content")}
				className={styles.textarea}
				placeholder="답변 내용을 입력해주세요..."
				rows={3}
				data-testid="answer-content-input"
			/>
			{errors.content && (
				<p className={styles.error} data-testid="answer-content-error">
					{errors.content.message}
				</p>
			)}
			<div className={styles.actions}>
				<button type="button" className={styles.cancelBtn} onClick={onCancel} data-testid="answer-cancel-button">
					취소
				</button>
				<button
					type="submit"
					className={styles.submitBtn}
					disabled={isSubmitting}
					data-testid="answer-submit-button"
				>
					{isSubmitting ? "등록 중..." : "등록"}
				</button>
			</div>
		</form>
	);
}

