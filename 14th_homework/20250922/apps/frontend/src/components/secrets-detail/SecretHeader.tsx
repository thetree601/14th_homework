"use client";

import React from "react";
import styles from "./SecretHeader.module.css";

export default function SecretHeader({
	title,
	description,
	tags,
}: {
	title: string;
	description: string;
	tags: string[];
}) {
	return (
		<header className={styles.header} data-testid="secret-header">
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.description}>{description}</p>
			<ul className={styles.tags} data-testid="secret-tags">
				{tags.map((tag) => (
					<li key={tag} className={styles.tagItem}>
						{tag}
					</li>
				))}
			</ul>
		</header>
	);
}


