import SecretDetail from "@/components/secrets-detail/SecretDetail";

type SecretDetailPageProps = {
	params: { secretId: string };
};

export default function SecretDetailPage({ params }: SecretDetailPageProps) {
	const mock = {
		id: params.secretId,
		title: "다정했던 그 사람",
		description: "정체를 알고나니 경악을 감출 수가 없었다....",
		imageSrc: "/images/pexels-viridianaor-34506354.jpg",
		tags: ["#충격실화", "#미국에서있었던일", "#1980년대", "#사기범죄"],
		intro:
			"주변 사람 모두에게 평판이 좋은 사람이었습니다. 학창시절에는 모범생이었고, 회사에서는 성실한 근무자였고,\n\n아내에게는 좋은 남편, 부모에게는 좋은 아들이었죠. 그 누구도 그를 나쁘게 기억하지 않았습니다. 그러나 우연히 알게 된 그의 실체는 결코 우리가 상상할 수 없었던 것이었어요",
		price: 15000,
	};

	return <SecretDetail data={mock} />;
}


