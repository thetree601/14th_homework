"use client";

import React from "react";
import styles from "./SecretComments.module.css";

export default function SecretComments() {
	return (
		<section className={styles.comments} data-testid="secret-comments">
			<h3 className={styles.title}>문의하기 · 댓글</h3>
			<div className={styles.placeholder}>
				<p className={styles.text}>여기에 문의/댓글 UI가 들어갑니다.</p>
				<button type="button" className={styles.inquiryBtn} data-testid="comments-inquiry-button">
					문의하기
				</button>
			</div>
		</section>
	);
}


