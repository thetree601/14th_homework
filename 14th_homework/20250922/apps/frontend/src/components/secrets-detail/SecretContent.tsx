"use client";

import React from "react";
import styles from "./SecretContent.module.css";

export default function SecretContent({
	img,
	intro,
}: {
	img: string | null | undefined;
	intro: string;
}) {
	// img 유효성 검사: null이 아니고, 문자열이며, 빈 문자열이 아닌 경우에만 유효
	const isValidImg = img && typeof img === 'string' && img.trim() !== '';
	
	return (
		<section className={styles.content} data-testid="secret-content">
			{isValidImg && (
				<div className={styles.imageWrap}>
					<img 
						src={img} 
						alt="비밀 이미지" 
						className={styles.image}
						onError={(e) => {
							console.error('이미지 로드 실패:', img);
							// 이미지 로드 실패 시 숨김 처리
							e.currentTarget.style.display = 'none';
						}}
					/>
				</div>
			)}
			<article className={styles.intro}>
				{intro.split("\n\n").map((paragraph, idx) => (
					<p key={idx} className={styles.paragraph}>
						{paragraph}
					</p>
				))}
			</article>
		</section>
	);
}


