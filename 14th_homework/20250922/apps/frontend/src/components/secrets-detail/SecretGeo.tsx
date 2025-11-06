"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SecretGeo.module.css";

type GeoForm = {
	address: string;
	postalCode: string;
	detail: string;
};

function getRandomColoradoLatLng() {
	// 대략적인 경계: lat 37.0~41.0, lng -109.0~-102.0
	const lat = 37 + Math.random() * 4;
	const lng = -109 + Math.random() * 7;
	return { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) };
}

export default function SecretGeo() {
	const { register, handleSubmit } = useForm<GeoForm>({
		defaultValues: { address: "", postalCode: "", detail: "" },
	});

	const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

	useEffect(() => {
		// 클라이언트 마운트 이후에만 좌표 생성 → SSR/CSR 불일치 방지
		setCoords(getRandomColoradoLatLng());
	}, []);

	const onSubmit = (data: GeoForm) => {
		// 단순 표시용
		console.log({ ...data, ...coords });
	};

	return (
		<section className={styles.geo} data-testid="secret-geo">
			<h3 className={styles.sectionTitle}>비밀과 관련된 위치</h3>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.label}>
					주소
					<input
						data-testid="address-input"
						className={styles.input}
						placeholder="주소를 입력하세요"
						{...register("address")}
					/>
				</label>
				<div className={styles.row}>
					<label className={styles.label}>
						우편번호
						<input
							data-testid="postal-input"
							className={styles.input}
							placeholder="우편번호"
							{...register("postalCode")}
						/>
					</label>
					<button type="button" className={styles.searchBtn} data-testid="postal-search">
						우편번호 검색
					</button>
				</div>
				<label className={styles.label}>
					상세 위치
					<input
						data-testid="detail-input"
						className={styles.input}
						placeholder="상세 위치"
						{...register("detail")}
					/>
				</label>
				<div className={styles.coords}>
					<div className={styles.coordItem}>
						<span className={styles.coordLabel}>위도 (LAT)</span>
						<strong className={styles.coordValue}>{coords ? coords.lat : "--"}</strong>
					</div>
					<div className={styles.coordItem}>
						<span className={styles.coordLabel}>경도 (LNG)</span>
						<strong className={styles.coordValue}>{coords ? coords.lng : "--"}</strong>
					</div>
				</div>
				<button type="submit" className={styles.submitBtn} data-testid="geo-submit">
					위치 저장
				</button>
			</form>
		</section>
	);
}


