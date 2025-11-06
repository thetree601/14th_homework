"use client";

import React from "react";
import styles from "./SecretContent.module.css";

export default function SecretContent({
	imageSrc,
	intro,
}: {
	imageSrc: string;
	intro: string;
}) {
	return (
		<section className={styles.content} data-testid="secret-content">
			<div className={styles.imageWrap}>
				<img src={imageSrc} alt="비밀 이미지" className={styles.image} />
			</div>
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


