import SecretsEdit from "@/components/secrets-edit";
import { fetchSecretById } from "@/components/secrets-list/queries";
import { notFound } from "next/navigation";
import { SecretsFormData } from "@/components/secrets-form";

// 캐시를 비활성화하여 항상 최신 데이터를 가져오도록 설정
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type SecretEditPageProps = {
	params: { secretId: string };
};

export default async function SecretEditPage({ params }: SecretEditPageProps) {
	const secretData = await fetchSecretById(params.secretId);

	if (!secretData) {
		notFound();
	}

	// SecretDetailData를 SecretsFormData 형식으로 변환
	// 기존 데이터를 모두 initialData에 포함하여 폼에 채움
	const initialData: Partial<SecretsFormData> = {
		title: secretData.title, // 기존 제목
		description: secretData.description, // 기존 한줄 설명
		intro: secretData.intro, // 기존 비밀 소개
		price: secretData.price.toString(), // 기존 가격
		tags: secretData.tags.join(", "), // 기존 태그
		address: secretData.address || "", // 기존 주소
		postalCode: secretData.postalCode || "", // 기존 우편번호
		addressDetail: secretData.addressDetail || "", // 기존 상세 주소
		latitude: secretData.latitude || "", // 기존 위도
		longitude: secretData.longitude || "", // 기존 경도
		image: null, // 파일은 null로 유지 (기존 이미지는 existingImageUrl로 전달)
	};

	return (
		<SecretsEdit
			secretId={params.secretId}
			initialData={initialData} // 모든 기존 데이터 포함
			existingImageUrl={secretData.img} // 기존 이미지 URL 전달 (데이터베이스 컬럼명 img 사용)
		/>
	);
}

