import { gql } from "@apollo/client";
import { supabase } from '@/lib/supabase-client';

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
	mutation createPointTransactionOfLoading($paymentId: ID!) {
		createPointTransactionOfLoading(paymentId: $paymentId) {
			_id
			impUid
			amount
			balance
			status
			statusDetail
			createdAt
			updatedAt
			deletedAt
		}
	}
`;

export interface Question {
	id: string;
	content: string;
	createdAt: string;
}

export interface Answer {
	id: string;
	questionId: string;
	content: string;
	createdAt: string;
}

export async function createQuestion(
	secretId: string,
	content: string
): Promise<{ success: boolean; error?: string }> {
	try {
		// 1. 기존 questions 조회
		const { data: secretData, error: fetchError } = await supabase
			.from('secrets')
			.select('questions')
			.eq('id', secretId)
			.single();
		
		if (fetchError) {
			return { success: false, error: fetchError.message };
		}
		
		// 2. 새 문의 항목 생성
		const newQuestion: Question = {
			id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
			content: content.trim(),
			createdAt: new Date().toISOString(),
		};
		
		// 3. questions 배열에 추가
		const existingQuestions: Question[] = secretData.questions || [];
		const updatedQuestions = [...existingQuestions, newQuestion];
		
		// 4. 업데이트
		const { error: updateError } = await supabase
			.from('secrets')
			.update({ questions: updatedQuestions })
			.eq('id', secretId);
		
		if (updateError) {
			return { success: false, error: updateError.message };
		}
		
		return { success: true };
	} catch (error) {
		console.error('문의 등록 중 오류 발생:', error);
		return { success: false, error: '문의 등록 중 오류가 발생했습니다.' };
	}
}

export async function updateQuestion(
	secretId: string,
	questionId: string,
	newContent: string
): Promise<{ success: boolean; error?: string }> {
	try {
		// 1. 기존 questions 조회
		const { data: secretData, error: fetchError } = await supabase
			.from('secrets')
			.select('questions')
			.eq('id', secretId)
			.single();
		
		if (fetchError) {
			return { success: false, error: fetchError.message };
		}
		
		// 2. questions 배열에서 해당 항목 찾아 수정
		const existingQuestions: Question[] = secretData.questions || [];
		const updatedQuestions = existingQuestions.map(question => 
			question.id === questionId
				? { ...question, content: newContent.trim() }
				: question
		);
		
		// 3. 업데이트
		const { error: updateError } = await supabase
			.from('secrets')
			.update({ questions: updatedQuestions })
			.eq('id', secretId);
		
		if (updateError) {
			return { success: false, error: updateError.message };
		}
		
		return { success: true };
	} catch (error) {
		console.error('문의 수정 중 오류 발생:', error);
		return { success: false, error: '문의 수정 중 오류가 발생했습니다.' };
	}
}

export async function deleteQuestion(
	secretId: string,
	questionId: string
): Promise<{ success: boolean; error?: string }> {
	try {
		// 1. 기존 questions 조회
		const { data: secretData, error: fetchError } = await supabase
			.from('secrets')
			.select('questions')
			.eq('id', secretId)
			.single();
		
		if (fetchError) {
			return { success: false, error: fetchError.message };
		}
		
		// 2. questions 배열에서 해당 항목 제거
		const existingQuestions: Question[] = secretData.questions || [];
		const updatedQuestions = existingQuestions.filter(
			question => question.id !== questionId
		);
		
		// 3. 업데이트
		const { error: updateError } = await supabase
			.from('secrets')
			.update({ questions: updatedQuestions })
			.eq('id', secretId);
		
		if (updateError) {
			return { success: false, error: updateError.message };
		}
		
		return { success: true };
	} catch (error) {
		console.error('문의 삭제 중 오류 발생:', error);
		return { success: false, error: '문의 삭제 중 오류가 발생했습니다.' };
	}
}

export async function createAnswer(
	secretId: string,
	questionId: string,
	content: string
): Promise<{ success: boolean; error?: string }> {
	try {
		// 1. 기존 answers 조회
		const { data: secretData, error: fetchError } = await supabase
			.from('secrets')
			.select('answers')
			.eq('id', secretId)
			.single();
		
		if (fetchError) {
			return { success: false, error: fetchError.message };
		}
		
		// 2. 새 답변 항목 생성
		const newAnswer: Answer = {
			id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
			questionId: questionId,
			content: content.trim(),
			createdAt: new Date().toISOString(),
		};
		
		// 3. answers 배열에 추가
		const existingAnswers: Answer[] = secretData.answers || [];
		const updatedAnswers = [...existingAnswers, newAnswer];
		
		// 4. 업데이트
		const { error: updateError } = await supabase
			.from('secrets')
			.update({ answers: updatedAnswers })
			.eq('id', secretId);
		
		if (updateError) {
			return { success: false, error: updateError.message };
		}
		
		return { success: true };
	} catch (error) {
		console.error('답변 등록 중 오류 발생:', error);
		return { success: false, error: '답변 등록 중 오류가 발생했습니다.' };
	}
}

export async function updateAnswer(
	secretId: string,
	answerId: string,
	newContent: string
): Promise<{ success: boolean; error?: string }> {
	try {
		// 1. 기존 answers 조회
		const { data: secretData, error: fetchError } = await supabase
			.from('secrets')
			.select('answers')
			.eq('id', secretId)
			.single();
		
		if (fetchError) {
			return { success: false, error: fetchError.message };
		}
		
		// 2. answers 배열에서 해당 항목 찾아 수정
		const existingAnswers: Answer[] = secretData.answers || [];
		const updatedAnswers = existingAnswers.map(answer => 
			answer.id === answerId
				? { ...answer, content: newContent.trim() }
				: answer
		);
		
		// 3. 업데이트
		const { error: updateError } = await supabase
			.from('secrets')
			.update({ answers: updatedAnswers })
			.eq('id', secretId);
		
		if (updateError) {
			return { success: false, error: updateError.message };
		}
		
		return { success: true };
	} catch (error) {
		console.error('답변 수정 중 오류 발생:', error);
		return { success: false, error: '답변 수정 중 오류가 발생했습니다.' };
	}
}

export async function deleteAnswer(
	secretId: string,
	answerId: string
): Promise<{ success: boolean; error?: string }> {
	try {
		// 1. 기존 answers 조회
		const { data: secretData, error: fetchError } = await supabase
			.from('secrets')
			.select('answers')
			.eq('id', secretId)
			.single();
		
		if (fetchError) {
			return { success: false, error: fetchError.message };
		}
		
		// 2. answers 배열에서 해당 항목 제거
		const existingAnswers: Answer[] = secretData.answers || [];
		const updatedAnswers = existingAnswers.filter(
			answer => answer.id !== answerId
		);
		
		// 3. 업데이트
		const { error: updateError } = await supabase
			.from('secrets')
			.update({ answers: updatedAnswers })
			.eq('id', secretId);
		
		if (updateError) {
			return { success: false, error: updateError.message };
		}
		
		return { success: true };
	} catch (error) {
		console.error('답변 삭제 중 오류 발생:', error);
		return { success: false, error: '답변 삭제 중 오류가 발생했습니다.' };
	}
}

