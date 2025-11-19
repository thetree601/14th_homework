"use client";

import React, { useRef, useEffect } from "react";
import Script from "next/script";
import styles from "./SecretGeo.module.css";

declare global {
	interface Window {
		kakao: any;
	}
}

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
	const mapRef = useRef<any>(null);
	const markerRef = useRef<any>(null);

	const KAKAO_MAP_API_KEY =
		process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ||
		"f9a89aef673fd594f7fef9f9892d883f";

	const initMap = (lat: number, lng: number) => {
		if (!window.kakao || !window.kakao.maps) return;

		const container = document.getElementById("map");
		if (!container) return;

		// 기존 지도가 있으면 제거
		if (mapRef.current) {
			mapRef.current = null;
		}

		const options = {
			center: new window.kakao.maps.LatLng(lat, lng),
			level: 3,
		};

		const map = new window.kakao.maps.Map(container, options);
		mapRef.current = map;

		// 기존 마커가 있으면 제거
		if (markerRef.current) {
			markerRef.current.setMap(null);
		}

		// 마커 표시
		const markerPosition = new window.kakao.maps.LatLng(lat, lng);
		const marker = new window.kakao.maps.Marker({
			position: markerPosition,
		});
		marker.setMap(map);
		markerRef.current = marker;
	};

	// 좌표 변경 감지 및 지도 업데이트
	useEffect(() => {
		if (!window.kakao || !window.kakao.maps) return;

		if (latitude && longitude) {
			const lat = parseFloat(latitude);
			const lng = parseFloat(longitude);

			if (!isNaN(lat) && !isNaN(lng)) {
				// 카카오 지도 API가 로드되었는지 확인
				if (window.kakao.maps.load) {
					window.kakao.maps.load(() => {
						initMap(lat, lng);
					});
				} else {
					initMap(lat, lng);
				}
			}
		}
	}, [latitude, longitude]);

	// 컴포넌트 언마운트 시 정리
	useEffect(() => {
		return () => {
			if (markerRef.current) {
				markerRef.current.setMap(null);
				markerRef.current = null;
			}
			if (mapRef.current) {
				mapRef.current = null;
			}
		};
	}, []);

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
			<Script
				src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
				strategy="lazyOnload"
				onLoad={() => {
					if (window.kakao && window.kakao.maps) {
						window.kakao.maps.load(() => {
							// 지도 초기화 로직 (좌표가 있을 때만)
							if (latitude && longitude) {
								const lat = parseFloat(latitude);
								const lng = parseFloat(longitude);
								if (!isNaN(lat) && !isNaN(lng)) {
									initMap(lat, lng);
								}
							}
						});
					}
				}}
			/>
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
			{hasCoords && latitude && longitude && (
				<div className={styles.mapContainer}>
					<div id="map" className={styles.map}></div>
				</div>
			)}
		</section>
	);
}


