"use client";

import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styles from "./styles.module.css";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

interface PasswordChangeProps {
  hideSectionHeader?: boolean;
}

export default function PasswordChange({ hideSectionHeader = false }: PasswordChangeProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [resetUserPassword] = useMutation(RESET_USER_PASSWORD);

  const validateForm = () => {
    let isValid = true;

    // 새 비밀번호 유효성 검사
    if (!newPassword.trim()) {
      setPasswordError("새 비밀번호를 입력해주세요");
      isValid = false;
    } else if (newPassword.length < 8) {
      setPasswordError("비밀번호는 최소 8자 이상이어야 합니다");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 비밀번호 확인 검사
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("비밀번호 확인을 입력해주세요");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage("");

    try {
      const result = await resetUserPassword({
        variables: {
          password: newPassword.trim(),
        },
      });

      if (result.data?.resetUserPassword) {
        setSuccessMessage("비밀번호가 성공적으로 변경되었습니다");
        // 폼 초기화
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setConfirmPasswordError("");
      }
    } catch (error: any) {
      console.error("비밀번호 변경 실패:", error);
      const errorMessage =
        error.message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";
      setPasswordError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.passwordSection}>
      {!hideSectionHeader && (
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>비밀번호 변경</h2>
          <p className={styles.sectionSubtitle}>
            계정 보안을 위해 비밀번호를 변경하세요
          </p>
        </div>
      )}

      <div className={styles.passwordContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword" className={styles.label}>
              새 비밀번호
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (passwordError) {
                  setPasswordError("");
                }
              }}
              placeholder="최소 8자 이상 입력해주세요"
              className={`${styles.input} ${
                passwordError ? styles.inputError : ""
              }`}
              disabled={isLoading}
            />
            {passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              새 비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) {
                  setConfirmPasswordError("");
                }
              }}
              placeholder="새 비밀번호를 다시 입력해주세요"
              className={`${styles.input} ${
                confirmPasswordError ? styles.inputError : ""
              }`}
              disabled={isLoading}
            />
            {confirmPasswordError && (
              <div className={styles.errorMessage}>
                {confirmPasswordError}
              </div>
            )}
          </div>

          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.changeButton}
              disabled={isLoading}
            >
              {isLoading ? "변경 중..." : "비밀번호 변경"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

