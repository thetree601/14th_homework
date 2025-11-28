"use client";

import React, { useCallback } from "react";
import { useModal } from "@/commons/providers/modal/modal.provider";
import { authManager } from "@/lib/auth";
import LoginModal from "../modals/LoginModal";
import styles from "./styles.module.css";

interface AuthButtonProps {
  isLoggedIn: boolean;
  onLoginSuccess?: () => void;
  onLogoutSuccess?: () => void;
}

export default function AuthButton({ 
  isLoggedIn, 
  onLoginSuccess,
  onLogoutSuccess 
}: AuthButtonProps) {
  const { openModal, closeModal } = useModal();

  const handleLoginClick = useCallback(() => {
    openModal(
      <LoginModal
        onCancel={closeModal}
        onSuccess={onLoginSuccess}
      />
    );
  }, [openModal, closeModal, onLoginSuccess]);

  const handleLogoutClick = useCallback(() => {
    authManager.clearToken();
    onLogoutSuccess?.();
    window.location.reload();
  }, [onLogoutSuccess]);

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogoutClick}
        className={styles.logoutButton}
      >
        로그아웃
      </button>
    );
  }

  return (
    <button
      onClick={handleLoginClick}
      className={styles.loginButton}
    >
      로그인
    </button>
  );
}

