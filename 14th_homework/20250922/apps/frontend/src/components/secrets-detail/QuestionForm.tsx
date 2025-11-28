"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./QuestionForm.module.css";

const questionSchema = z.object({
	content: z.string().min(1, "문의 내용을 입력해주세요.").max(1000, "문의 내용은 1000자 이하로 입력해주세요."),
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
	onSubmit: (content: string) => Promise<void>;
	onCancel: () => void;
}

export default function QuestionForm({ onSubmit, onCancel }: QuestionFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<QuestionFormData>({
		resolver: zodResolver(questionSchema),
	});

	const handleFormSubmit = async (data: QuestionFormData) => {
		setIsSubmitting(true);
		try {
			await onSubmit(data.content);
			reset();
		} catch (error) {
			console.error("문의 등록 중 오류:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} data-testid="question-form">
			<textarea
				{...register("content")}
				className={styles.textarea}
				placeholder="문의 내용을 입력해주세요..."
				rows={4}
				data-testid="question-content-input"
			/>
			{errors.content && (
				<p className={styles.error} data-testid="question-content-error">
					{errors.content.message}
				</p>
			)}
			<div className={styles.actions}>
				<button type="button" className={styles.cancelBtn} onClick={onCancel} data-testid="question-cancel-button">
					취소
				</button>
				<button
					type="submit"
					className={styles.submitBtn}
					disabled={isSubmitting}
					data-testid="question-submit-button"
				>
					{isSubmitting ? "등록 중..." : "등록"}
				</button>
			</div>
		</form>
	);
}


