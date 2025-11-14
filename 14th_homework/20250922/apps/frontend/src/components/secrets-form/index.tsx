"use client";

import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DaumPostcode from "react-daum-postcode";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { authManager } from "@/lib/auth";
import LoginModal from "@/components/secrets-list/modals/LoginModal";
import styles from "./styles.module.css";

// 폼 데이터 타입
export interface SecretsFormData {
  title: string;
  description: string;
  intro: string;
  price: string;
  tags: string;
  address: string;
  postalCode: string;
  addressDetail: string;
  latitude: string;
  longitude: string;
  image: FileList | null;
}

// Zod 스키마
const secretsFormSchema = z.object({
  title: z.string().min(1, "비밀명을 입력해주세요"),
  description: z.string().min(1, "한줄 설명을 입력해주세요"),
  intro: z.string().min(1, "비밀 소개를 입력해주세요"),
  price: z.string().min(1, "판매 가격을 입력해주세요"),
  tags: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  addressDetail: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  image: z.custom<FileList | null>().optional(),
});

interface SecretsFormProps {
  mode: "create" | "edit";
  initialData?: Partial<SecretsFormData>;
  existingImageUrl?: string | null; // 기존 이미지 URL 추가
  onSubmit: (data: SecretsFormData) => void;
  onCancel: () => void;
}

export default function SecretsForm({
  mode,
  initialData,
  existingImageUrl: propExistingImageUrl,
  onSubmit,
  onCancel,
}: SecretsFormProps) {
  const { openModal, closeModal } = useModal();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
    propExistingImageUrl || null
  );
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<SecretsFormData>({
    resolver: zodResolver(secretsFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      intro: "",
      price: "",
      tags: "",
      address: "",
      postalCode: "",
      addressDetail: "",
      latitude: "",
      longitude: "",
      image: null,
    },
  });

  const watchedImage = watch("image");

  // watch 값 변화 감지 (디버깅용)
  useEffect(() => {
    console.log("watch('image') 값 변화:", watchedImage);
    console.log("watchedImage 타입:", typeof watchedImage);
    console.log("watchedImage length:", watchedImage?.length);
    if (watchedImage && watchedImage.length > 0) {
      console.log("watchedImage[0]:", watchedImage[0]);
    }
  }, [watchedImage]);

  // 파일 선택 핸들러 (Controller의 onChange에서 호출됨)
  const handleFileChange = (files: FileList | null) => {
    console.log("handleFileChange 호출됨, files:", files); // 디버깅용
    
    if (files && files.length > 0) {
      const file = files[0];
      console.log("파일 정보:", file.name, file.type, file.size); // 디버깅용
      
      // 즉시 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(file);
      console.log("미리보기 URL 생성:", objectUrl); // 디버깅용
      setPreviewUrl((prevUrl) => {
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
        }
        console.log("previewUrl 설정됨:", objectUrl); // 디버깅용
        return objectUrl;
      });
      setExistingImageUrl(null);
    } else {
      // 파일이 없으면 미리보기 제거
      setPreviewUrl((prevUrl) => {
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
        }
        return null;
      });
    }
  };

  // 수정 모드일 때 initialData로 폼 초기화
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // 수정 모드일 때 기존 이미지 URL 설정
  useEffect(() => {
    if (mode === "edit" && propExistingImageUrl) {
      setExistingImageUrl(propExistingImageUrl);
    }
  }, [mode, propExistingImageUrl]);

  // 컴포넌트 언마운트 시 메모리 정리만 수행
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  // 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setPreviewUrl((prevUrl) => {
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
      return null;
    });
    setExistingImageUrl(null);
    // Controller를 통해 값 제거
    setValue("image", null, { shouldValidate: false });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 이미지 선택 핸들러
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 주소 검색 핸들러
  const handlePostcodeSearch = () => {
    setIsPostcodeModalOpen(true);
  };

  // 우편번호 검색 완료 핸들러
  const handleCompletePostcode = (data: any) => {
    setValue("postalCode", data.zonecode);
    setValue("address", data.address);
    setIsPostcodeModalOpen(false);
  };

  // 모달 닫기 핸들러
  const handleClosePostcodeModal = () => {
    setIsPostcodeModalOpen(false);
  };

  const handleFormSubmit = (data: SecretsFormData) => {
    // 디버깅: 폼 제출 시점의 데이터 확인
    console.log('=== handleFormSubmit 시작 ===');
    console.log('handleFormSubmit 호출됨, data:', data);
    console.log('data.image:', data.image);
    console.log('data.image 타입:', typeof data.image);
    console.log('data.image instanceof FileList:', data.image instanceof FileList);
    console.log('data.image length:', data.image?.length);
    
    // watch 값도 확인 (Controller가 저장한 값)
    const currentImageValue = watch("image");
    console.log('watch("image") 현재 값:', currentImageValue);
    console.log('watch("image") 타입:', typeof currentImageValue);
    console.log('watch("image") instanceof FileList:', currentImageValue instanceof FileList);
    console.log('watch("image") length:', currentImageValue?.length);
    
    // 빈 FileList를 null로 변환 (수정 모드에서 이미지를 선택하지 않은 경우 처리)
    let processedData = { ...data };
    
    // 중요: data.image가 없거나 비어있으면 watch 값 확인
    if ((!data.image || (data.image instanceof FileList && data.image.length === 0)) && currentImageValue) {
      console.log('data.image가 비어있어서 watch 값 사용:', currentImageValue);
      processedData.image = currentImageValue;
    }
    
    // 🔥 중요: 수정 모드에서 이미지를 선택하지 않았고 기존 이미지가 있으면 undefined로 설정
    // (undefined면 updateSecret에서 기존 이미지를 유지함)
    if (mode === "edit" && 
        (!processedData.image || (processedData.image instanceof FileList && processedData.image.length === 0)) &&
        (currentImageValue === null || currentImageValue === undefined) &&
        propExistingImageUrl) {
      console.log('✅ 수정 모드: 이미지 변경 없음, 기존 이미지 유지 (undefined 설정)');
      processedData.image = undefined; // undefined = 변경 없음
    } else if (processedData.image && processedData.image instanceof FileList && processedData.image.length === 0) {
      // 빈 FileList를 null로 변환 (명시적으로 이미지를 제거한 경우)
      processedData.image = null;
      console.log('빈 FileList를 null로 변환 (이미지 제거)');
    }
    
    if (processedData.image && processedData.image.length > 0) {
      console.log('✅ 첫 번째 파일:', processedData.image[0]);
      console.log('✅ 파일명:', processedData.image[0].name);
      console.log('✅ 파일 크기:', processedData.image[0].size);
    } else {
      console.warn('⚠️ 경고: processedData.image가 없거나 비어있습니다!');
      console.warn('⚠️ processedData.image:', processedData.image);
    }
    
    console.log('=== handleFormSubmit 끝 ===');
    
    // 로그인 체크 제거 - 누구나 등록 가능
    onSubmit(processedData);
  };

  const titleText = mode === "create" ? "비밀 등록하기" : "비밀 수정하기";
  const submitButtonText = mode === "create" ? "등록하기" : "수정하기";

  return (
    <div className={styles.container} data-testid="secrets-form">
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>{titleText}</h1>
      </div>

      <section className={styles.formSection}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>비밀명</label>
              <input
                {...register("title")}
                className={styles.input}
                placeholder="비밀의 제목을 입력하세요"
                data-testid="form-title"
              />
              {errors.title && (
                <span className={styles.error}>{errors.title.message}</span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>한줄 설명</label>
              <input
                {...register("description")}
                className={styles.input}
                placeholder="간단한 설명을 입력하세요"
                data-testid="form-description"
              />
              {errors.description && (
                <span className={styles.error}>{errors.description.message}</span>
              )}
            </div>

            <div className={styles.fieldGroupFull}>
              <label className={styles.label}>비밀 소개</label>
              <textarea
                {...register("intro")}
                className={styles.textarea}
                placeholder="이 비밀에 대해 자세히 소개해 주세요"
                data-testid="form-intro"
              />
              {errors.intro && (
                <span className={styles.error}>{errors.intro.message}</span>
              )}
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>판매 가격</label>
                <input
                  {...register("price")}
                  className={styles.input}
                  placeholder="예: 10000"
                  inputMode="numeric"
                  data-testid="form-price"
                />
                {errors.price && (
                  <span className={styles.error}>{errors.price.message}</span>
                )}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>태그 입력</label>
                <input
                  {...register("tags")}
                  className={styles.input}
                  placeholder="쉼표(,)로 구분하여 입력"
                  data-testid="form-tags"
                />
              </div>
            </div>

            <div className={styles.fieldGroupFull}>
              <label className={styles.label}>비밀과 관련된 주소</label>
              <div className={styles.addressRow}>
                <input
                  {...register("address")}
                  className={styles.input}
                  placeholder="주소"
                  data-testid="form-address"
                />
                <button
                  className={styles.secondaryButton}
                  type="button"
                  onClick={handlePostcodeSearch}
                  data-testid="form-address-search"
                >
                  주소 검색
                </button>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelSm}>우편번호</label>
                  <input
                    {...register("postalCode")}
                    className={styles.input}
                    placeholder="우편번호"
                    data-testid="form-postal-code"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelSm}>상세 위치</label>
                  <input
                    {...register("addressDetail")}
                    className={styles.input}
                    placeholder="상세 주소"
                    data-testid="form-address-detail"
                  />
                </div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelSm}>위도 (LAT)</label>
                  <input
                    {...register("latitude")}
                    className={styles.input}
                    placeholder="예: 37.5665"
                    inputMode="decimal"
                    data-testid="form-latitude"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelSm}>경도 (LNG)</label>
                  <input
                    {...register("longitude")}
                    className={styles.input}
                    placeholder="예: 126.9780"
                    inputMode="decimal"
                    data-testid="form-longitude"
                  />
                </div>
              </div>
            </div>

            <div className={styles.fieldGroupFull}>
              <label className={styles.label}>사진 첨부</label>
              <div
                className={styles.uploadBox}
                role="button"
                onClick={handleImageClick}
                data-testid="form-image-upload-box"
                style={{
                  backgroundImage: previewUrl || existingImageUrl 
                    ? `url(${previewUrl || existingImageUrl})` 
                    : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {previewUrl || existingImageUrl ? (
                  <>
                    <div className={styles.imageOverlay} />
                    <button
                      type="button"
                      className={styles.removeImageButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      data-testid="form-image-remove"
                    >
                      ✕
                    </button>
                    <span className={styles.changeImageText}>클릭해서 이미지 변경</span>
                  </>
                ) : (
                  <span>클릭해서 사진 업로드</span>
                )}
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => {
                    return (
                      <input
                        ref={(e) => {
                          fileInputRef.current = e;
                          field.ref(e);
                        }}
                        onChange={(e) => {
                          const files = e.target.files;
                          console.log("=== input onChange 시작 ===");
                          console.log("input onChange 호출됨, files:", files);
                          console.log("files 타입:", typeof files);
                          console.log("files length:", files?.length);
                          
                          if (files && files.length > 0) {
                            const file = files[0];
                            console.log("첫 번째 파일:", file);
                            console.log("파일명:", file.name);
                            console.log("파일 크기:", file.size);
                            
                            // FileList 객체를 그대로 저장
                            console.log("field.onChange 호출 전");
                            field.onChange(files);
                            console.log("field.onChange 호출 후");
                            
                            // 미리보기 업데이트
                            handleFileChange(files);
                          } else {
                            field.onChange(null);
                            handleFileChange(null);
                          }
                          console.log("=== input onChange 끝 ===");
                        }}
                        name={field.name}
                        className={styles.fileInput}
                        type="file"
                        accept="image/*"
                        data-testid="form-image"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={onCancel}
              data-testid="form-cancel"
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.primaryButton}
              data-testid="form-submit"
            >
              {submitButtonText}
            </button>
          </div>
        </form>

        {/* 우편번호 검색 모달 */}
        {isPostcodeModalOpen && (
          <div className={styles.modalOverlay} onClick={handleClosePostcodeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h3>우편번호 검색</h3>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={handleClosePostcodeModal}
                >
                  ×
                </button>
              </div>
              <DaumPostcode
                onComplete={handleCompletePostcode}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

