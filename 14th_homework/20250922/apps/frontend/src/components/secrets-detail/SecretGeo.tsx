"use client";

import React from "react";
import styles from "./SecretGeo.module.css";

interface SecretGeoProps {
	address?: string;
	postalCode?: string;
	addressDetail?: string;
	latitude?: string;
	longitude?: string;
}

export default function SecretGeo({
	address,
	postalCode,
	addressDetail,
	latitude,
	longitude,
}: SecretGeoProps) {
	const hasAddress = address || postalCode || addressDetail;
	const hasCoords = latitude || longitude;

	if (!hasAddress && !hasCoords) {
		return (
			<section className={styles.geo} data-testid="secret-geo">
				<h3 className={styles.sectionTitle}>비밀과 관련된 위치</h3>
				<div className={styles.emptyMessage}>등록된 위치 정보가 없습니다.</div>
			</section>
		);
	}

	return (
		<section className={styles.geo} data-testid="secret-geo">
			<h3 className={styles.sectionTitle}>비밀과 관련된 위치</h3>
			<div className={styles.infoContainer}>
				{hasAddress && (
					<div className={styles.addressSection}>
						{address && (
							<div className={styles.infoItem}>
								<span className={styles.infoLabel}>주소</span>
								<span className={styles.infoValue} data-testid="address-display">
									{address}
								</span>
							</div>
						)}
						{postalCode && (
							<div className={styles.infoItem}>
								<span className={styles.infoLabel}>우편번호</span>
								<span className={styles.infoValue} data-testid="postal-display">
									{postalCode}
								</span>
							</div>
						)}
						{addressDetail && (
							<div className={styles.infoItem}>
								<span className={styles.infoLabel}>상세 위치</span>
								<span className={styles.infoValue} data-testid="detail-display">
									{addressDetail}
								</span>
							</div>
						)}
					</div>
				)}
				{hasCoords && (
					<div className={styles.coords}>
						{latitude && (
							<div className={styles.coordItem}>
								<span className={styles.coordLabel}>위도 (LAT)</span>
								<strong className={styles.coordValue} data-testid="latitude-display">
									{latitude}
								</strong>
							</div>
						)}
						{longitude && (
							<div className={styles.coordItem}>
								<span className={styles.coordLabel}>경도 (LNG)</span>
								<strong className={styles.coordValue} data-testid="longitude-display">
									{longitude}
								</strong>
							</div>
						)}
					</div>
				)}
			</div>
		</section>
	);
}


