"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SecretsForm, { SecretsFormData } from "@/components/secrets-form";
import { createSecret } from "@/components/secrets-list/mutations";

export default function SecretsNew() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: SecretsFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await createSecret(data);
      
      if (result.success && result.id) {
        alert("비밀이 성공적으로 등록되었습니다!");
        router.push(`/secrets/${result.id}`);
      } else {
        alert(`등록 실패: ${result.error || "알 수 없는 오류가 발생했습니다."}`);
      }
    } catch (error) {
      console.error("등록 중 오류 발생:", error);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/secrets");
  };

  return (
    <SecretsForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}


