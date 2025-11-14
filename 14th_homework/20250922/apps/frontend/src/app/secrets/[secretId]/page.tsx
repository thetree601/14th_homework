import SecretDetail from "@/components/secrets-detail/SecretDetail";
import { fetchSecretById } from "@/components/secrets-list/queries";
import { notFound } from "next/navigation";

// 캐시를 비활성화하여 항상 최신 데이터를 가져오도록 설정
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type SecretDetailPageProps = {
	params: { secretId: string };
};

export default async function SecretDetailPage({ params }: SecretDetailPageProps) {
	const secretData = await fetchSecretById(params.secretId);

	if (!secretData) {
		notFound();
	}

	return <SecretDetail data={secretData} />;
}


