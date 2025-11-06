"use client";

import React from "react";
import styles from "./SecretDetail.module.css";
import SecretHeader from "./SecretHeader";
import SecretContent from "./SecretContent";
import SecretActions from "./SecretActions";
import SecretGeo from "./SecretGeo";
import SecretComments from "./SecretComments";

export type SecretDetailData = {
	id: string;
	title: string;
	description: string;
	imageSrc: string;
	tags: string[];
	intro: string;
	price: number;
};

export default function SecretDetail({ data }: { data: SecretDetailData }) {
	return (
		<div className={styles.container} data-testid="secret-detail">
			<SecretHeader
				title={data.title}
				description={data.description}
				tags={data.tags}
			/>
			<div className={styles.main}>
				<SecretContent imageSrc={data.imageSrc} intro={data.intro} />
				<div className={styles.side}>
					<SecretActions price={data.price} />
					<SecretGeo />
				</div>
			</div>
			<SecretComments />
		</div>
	);
}


